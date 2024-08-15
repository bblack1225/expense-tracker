package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, String>, JpaSpecificationExecutor<Member> {
    List<Member> findByBookId(String bookId);
}