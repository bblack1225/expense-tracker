package com.blake.expensetrackerbackend.repository;

import com.blake.expensetrackerbackend.model.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CommentsRepository extends JpaRepository<Comments, String>, JpaSpecificationExecutor<Comments> {

}