package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entity.TransactionEntity;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer>{
	
	@Query(
			value="SELECT"
					+ "	U.name ,T.user_id,"
					+ "	(SUM(CASE WHEN T.result = 'WIN' THEN 1 ELSE 0 END) * 100.0) / COUNT(T.tx_id) AS win_percentage"
					+ " FROM"
					+ " transaction_log T"
					+ " JOIN USERS U ON T.user_id=U.user_id"
					+ " GROUP BY"
					+ " T.user_id",
			nativeQuery = true
			)
	public List<Object[]> leaderboard();
	
	@Query(
			value="SELECT U.name, (SUM(CASE WHEN T.result = 'WIN' THEN 1 ELSE 0 END) * 100.0) / COUNT(T.tx_id) FROM transaction_log T"
			+ " JOIN USERS U ON T.user_id=U.user_id GROUP BY T.user_id",
			nativeQuery = true)
	public List<Object[]> getWinRate();
}
