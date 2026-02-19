package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="transactionLog")
public class TransactionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer txId;
	
	private Integer guess;
	private Integer generatedNumber;
	private String result;
	private Integer txCredits;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private UserEntity user;


	public Integer getTxId() {
		return txId;
	}

	public void setTxId(Integer txId) {
		this.txId = txId;
	}

	public Integer getGuess() {
		return guess;
	}

	public void setGuess(Integer guess) {
		this.guess = guess;
	}

	
	public Integer getGeneratedNumber() {
		return generatedNumber;
	}

	public void setGeneratedNumber(Integer generatedNumber) {
		this.generatedNumber = generatedNumber;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Integer getTxCredits() {
		return txCredits;
	}

	public void setTxCredits(Integer txCredits) {
		this.txCredits = txCredits;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "TransactionEntity [txId=" + txId + ", guess=" + guess + ", generatedNumber=" + generatedNumber
				+ ", result=" + result + ", txCredits=" + txCredits + ", user=" + user.getName() + "]";
	}
	
	
}
