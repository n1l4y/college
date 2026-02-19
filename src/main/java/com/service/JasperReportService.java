package com.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.entity.UserEntity;
import com.repository.UserRepository;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class JasperReportService {
	
	@Autowired
	UserRepository userRepository;
	
	public void exportReport() throws Exception {

		List<UserEntity> users = userRepository.findAll();
	
		System.out.println(users);
		
		JasperReport jasperReport = JasperCompileManager.compileReport(ResourceUtils.getFile("classpath:demo.jrxml").getAbsolutePath());
        System.out.println("Compiled report successfully.");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("SampleParameter", "Hello, JasperReports!");
        
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(users);
       
        
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
		JasperExportManager.exportReportToPdfFile(jasperPrint,"demo.pdf");

	}
	
	public void exportCerti() throws Exception {
		List<UserEntity> allUsers = userRepository.findAll();
		int i = 0;
		for(UserEntity user : allUsers) {
			JasperReport jasperReport = JasperCompileManager.compileReport(ResourceUtils.getFile("classpath:certi.jrxml").getAbsolutePath());
	        System.out.println("Compiled report successfully.");
	        
	        Map<String, Object> parameters = new HashMap<>();
	        parameters.put("SampleParameter", "Hello, JasperReports!");
	        
	        JRBeanArrayDataSource dataSource = new JRBeanArrayDataSource(new UserEntity[] {user});
	       
	        
	        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
			JasperExportManager.exportReportToPdfFile(jasperPrint,"demo" + i + ".pdf");
			i++;
		}
	}
}
