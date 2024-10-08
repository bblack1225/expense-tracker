package com.blake.expensetrackerbackend.model.entity;

import com.blake.expensetrackerbackend.enums.TransactionRecordType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
@Entity
@Table(name = "transaction_category")
public class TransactionCategory implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "icon")
    private String icon;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionRecordType type;

    @Column(name = "book_id", nullable = false)
    private String bookId;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false)
    @UpdateTimestamp
    private OffsetDateTime updatedAt;

}
