CREATE TABLE members (
                         id VARCHAR(20) not null constraint members_id_pk PRIMARY KEY,  -- 主鍵，使用XID
                         book_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 accounting_book 表的 id 欄位
                         name VARCHAR(100) NOT NULL,  -- 名字，假設最大長度 100 個字符
                         email VARCHAR(255) NOT NULL,  -- 電子郵件地址，假設最大長度 255 個字符
                         share integer not null,  -- 分享標誌，使用布爾類型，默認為 false
                         created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                         updated_at TIMESTAMP(3) WITH TIME ZONE,  -- 更新時間

                         CONSTRAINT members_book_id_fk FOREIGN KEY (book_id)
                             REFERENCES accounting_book(id) ON DELETE CASCADE  -- 外鍵約束，對應 accounting_book 表的 id 欄位
);