CREATE TABLE accounting_book (
                                 id VARCHAR(20) not null CONSTRAINT accounting_book_id_pk PRIMARY KEY,  -- XID 作為主鍵
                                 name VARCHAR(255) NOT NULL,  -- 書名
                                 pin VARCHAR(32),  -- Pin 碼（可選）
                                 created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                                 updated_at TIMESTAMP(3) WITH TIME ZONE  -- 更新時間
);