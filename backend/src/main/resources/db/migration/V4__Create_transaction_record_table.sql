CREATE TABLE transaction_record (
                                    id VARCHAR(20) NOT NULL CONSTRAINT transaction_record_id_pk PRIMARY KEY,  -- XID 作為主鍵
                                    amount INTEGER NOT NULL,  -- 金額
                                    transaction_date DATE NOT NULL,  -- 交易日期
                                    description TEXT,  -- 描述
                                    category_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 transaction_category 表的 id 欄位
                                    member_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 members 表的 id 欄位
                                    book_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 accounting_book 表的 id 欄位
                                    type VARCHAR(32) NOT NULL,  -- 類型
                                    created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                                    updated_at TIMESTAMP(3) WITH TIME ZONE,  -- 更新時間，可為空

                                    CONSTRAINT transaction_record_category_id_fk FOREIGN KEY (category_id)
                                        REFERENCES transaction_category(id) ON DELETE CASCADE,  -- 外鍵約束，對應 transaction_category 表的 id 欄位
                                    CONSTRAINT transaction_record_member_id_fk FOREIGN KEY (member_id)
                                        REFERENCES members(id) ON DELETE CASCADE,  -- 外鍵約束，對應 members 表的 id 欄位
                                    CONSTRAINT transaction_record_book_id_fk FOREIGN KEY (book_id)
                                        REFERENCES accounting_book(id) ON DELETE CASCADE  -- 外鍵約束，對應 accounting_book 表的 id 欄位
);