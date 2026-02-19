package com.controller;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dto.EmailDto;
import com.dto.LoginDto;
import com.dto.ResetPassDto;
import com.entity.TransactionEntity;
import com.entity.UserEntity;
import com.repository.TransactionRepository;
import com.repository.UserRepository;
import com.service.JasperReportService;
import com.service.MailService;
import com.service.OtpService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class SessionController {

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	UserRepository repository;

	@Autowired
	TransactionRepository txRepository;

	@Autowired
	MailService mailService;

	@Autowired
	OtpService otpService;
	
	@Autowired
	JasperReportService jasperReportService;

	@GetMapping("/signup")
	public String signup() {
		return "Signup";
	}

	@PostMapping("/signup")
	public String signup(@Validated UserEntity user, BindingResult result, Model model,
			@RequestParam("pic") MultipartFile file) {

		if (result.hasErrors() || file.isEmpty()) {
			model.addAttribute("error", result);
			return "Signup";
		}

		// file -> client -> server location

		try {
		
			File folder = new File("D:\\SpringWebHb\\guess-number-game\\src\\main\\webapp\\",user.getEmail());
			folder.mkdir();
			file.transferTo(
					new File(folder,file.getOriginalFilename()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		user.setProfilePath(user.getEmail()+"/"+file.getOriginalFilename());
		
		String plainPassword = user.getPassword();
		user.setPassword(encoder.encode(plainPassword));
		user.setRole("USER");
		user.setCredits(500);

		repository.save(user);

		model.addAttribute("message", "User has signed up successfully, please sign in...");

		return "Signin";
	}

	@GetMapping("/signin")
	public String signin(HttpSession session) {
		if (session.getAttribute("user") != null) {
			return "redirect:/home";
		}
		return "Signin";
	}

	@PostMapping("/signin")
	public String signin(@Validated LoginDto login, BindingResult result, Model model, HttpSession session) {
		if (result.hasErrors()) {
			model.addAttribute("validationError", result);
			return "Signin";
		}

		Optional<UserEntity> searched = repository.findByEmail(login.getEmail());
		if (searched.isEmpty()) {

			model.addAttribute("error", "Email is not registered");
			return "Signin";
		}

		UserEntity user = searched.get();

		if (!encoder.matches(login.getPassword(), user.getPassword())) {
			model.addAttribute("error", "Incorrect password");
			return "Signin";
		}

//		model.addAttribute("user", user);
		session.setAttribute("user", user);
		session.setAttribute("role", user.getRole());

		if (user.getRole().equalsIgnoreCase("USER")) {
			return "Home";
		} else {
			return "AdminDashboard";
		}
	}

	@GetMapping("forgot")
	public String forgotPassword() {
		return "ResetPassword";
	}

	@PostMapping("reset")
	public String resetPassword(@Validated EmailDto email, BindingResult result, Model model,
			HttpServletResponse response) {
		if (result.hasErrors()) {
			model.addAttribute("error", result.getFieldError("email").getDefaultMessage());
			return "ResetPassword";
		}
		Optional<UserEntity> search = repository.findByEmail(email.getEmail());
		if (search.isEmpty()) {
			model.addAttribute("error", "Email is not registered");
			return "ResetPassword";
		}
		UserEntity user = search.get();
		String otp = otpService.generateOtp(6);

		mailService.sendMessage(user.getEmail(), otp);
		user.setOtp(otp);
		repository.save(user);
		Cookie cookie = new Cookie("email", user.getEmail());
		response.addCookie(cookie);
//		model.addAttribute("email", user.getEmail());
		return "redirect:/newpassword";
	}

	@GetMapping("newpassword")
	public String newPassword() {
		return "NewPassword";
	}

	@PostMapping("updatepassword")
	public String updatePassword(@Validated ResetPassDto updatedPassword, BindingResult result, Model model) {

		System.out.println("email from jsp..." + updatedPassword.getEmail());
		if (result.hasErrors()) {
			model.addAttribute("error", result.getFieldError("password1").getDefaultMessage());
			return "NewPassword";
		}

		if (!updatedPassword.getPassword1().equals(updatedPassword.getPassword2())) {
			model.addAttribute("passError", "Password do not match!");
			return "NewPassword";
		}

		System.out.println("Optional..." + updatedPassword.getEmail());
		Optional<UserEntity> search = repository.findByEmail(updatedPassword.getEmail());

		UserEntity user = search.get();
		System.out.println("Email..." + user.getEmail());

		if (!user.getOtp().equals(updatedPassword.getOtp())) {
			model.addAttribute("otpError", "Invalid OTP");
			return "NewPassword";
		}

		user.setPassword(encoder.encode(updatedPassword.getPassword1()));
		model.addAttribute("message", "Password has been updated!");
		return "Signin";
	}

	@GetMapping("startgame")
	public String startGame() {
		return "StartGame";
	}

	@PostMapping("checkguess")
	public String checkGuess(HttpSession session, TransactionEntity tx) {
		UserEntity user = (UserEntity) session.getAttribute("user");
		tx.setUser(user);
		Integer generatedNumber = 1 + (int) (Math.random() * 5);
		tx.setGeneratedNumber(generatedNumber);
		if (tx.getGuess() == generatedNumber) {
			tx.setResult("WIN");
			tx.setTxCredits(100);
			user.setCredits(user.getCredits() + 100);
		} else {
			tx.setResult("LOSE");
			tx.setTxCredits(-10);
			user.setCredits(user.getCredits() - 10);
		}
		repository.save(user);
		txRepository.save(tx);
		session.setAttribute("user", user);
		session.setAttribute("tx", tx);
		return "redirect:/home";
	}

	@GetMapping("home")
	public String home() {
		return "Home";
	}

	@GetMapping("signout")
	public String signOut(HttpSession session) {
		session.invalidate();
		return "redirect:/signin";
	}

	@GetMapping("leaderboard")
	public String leaderboard(Model model) {
		List<Object[]> leaderboard = txRepository.leaderboard();
		model.addAttribute("leaderboard", leaderboard);
		return "Leaderboard";
	}

	@GetMapping("admin-viewusers")
	public String viewUsers(Model model) {
		List<UserEntity> users = repository.findAll();
		List<Object[]> winRates = txRepository.getWinRate();
		model.addAttribute("users", users);
		model.addAttribute("winRates", winRates);
		return "AdminViewUsers";
	}

	@GetMapping("admin-viewtx")
	public String viewTx(Model model) {
		List<TransactionEntity> tx = txRepository.findAll();
		model.addAttribute("tx", tx);
		return "AdminViewTx";
	}
	
	@GetMapping("pdf")
	public String generatePdf() {
		
		try {
			jasperReportService.exportReport();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return "Home";
	}
	
	@GetMapping("certificates")
	public String generateCertificates() {
		try {
			jasperReportService.exportCerti();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "Home";
	}
}
