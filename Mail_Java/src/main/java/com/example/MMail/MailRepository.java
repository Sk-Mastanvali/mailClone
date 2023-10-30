package com.example.MMail;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailRepository extends JpaRepository<Mail, Integer>{
	List<Mail> findByTypeAndUser(String type,User user);
	List<Mail> findByIsImportantAndUser(boolean isimportant,User user);
}