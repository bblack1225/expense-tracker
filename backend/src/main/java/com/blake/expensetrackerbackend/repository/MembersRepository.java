package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MembersRepository extends JpaRepository<Members, String>, JpaSpecificationExecutor<Members> {

}