CREATE TABLE accounting_book (
                                 id VARCHAR(20) not null CONSTRAINT accounting_book_id_pk PRIMARY KEY,  -- XID 作為主鍵
                                 name VARCHAR(255) NOT NULL,  -- 書名
                                 pin VARCHAR(32),  -- Pin 碼（可選）
                                 created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                                 updated_at TIMESTAMP(3) WITH TIME ZONE  -- 更新時間
);


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


CREATE TABLE transaction_category (
                                      id VARCHAR(20) NOT NULL CONSTRAINT transaction_category_id_pk PRIMARY KEY,  -- XID 作為主鍵
                                      name VARCHAR(255) NOT NULL,  -- 類別名稱
                                      icon VARCHAR(64),  -- 圖標（可選）
                                      type VARCHAR(32) NOT NULL,  -- 類型（例如收入、支出等）
                                      book_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 accounting_book 表的 id 欄位
                                      created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                                      updated_at TIMESTAMP(3) WITH TIME ZONE,  -- 更新時間，可為空
                                      CONSTRAINT transaction_category_book_id_fk FOREIGN KEY (book_id)
                                          REFERENCES accounting_book(id) ON DELETE CASCADE  -- 外鍵約束，對應 accounting_book 表的 id 欄位
);


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

CREATE TABLE comments (
                          id VARCHAR(20) NOT NULL CONSTRAINT comments_id_pk PRIMARY KEY,  -- XID 作為主鍵
                          content TEXT NOT NULL,  -- 評論內容
                          member_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 members 表的 id 欄位
                          book_id VARCHAR(20) NOT NULL,  -- 外鍵，對應 accounting_book 表的 id 欄位
                          created_at TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- 建立時間
                          updated_at TIMESTAMP(3) WITH TIME ZONE,  -- 更新時間，可為空

                          CONSTRAINT comments_member_id_fk FOREIGN KEY (member_id)
                              REFERENCES members(id) ON DELETE CASCADE,  -- 外鍵約束，對應 members 表的 id 欄位
                          CONSTRAINT comments_book_id_fk FOREIGN KEY (book_id)
                              REFERENCES accounting_book(id) ON DELETE CASCADE  -- 外鍵約束，對應 accounting_book 表的 id 欄位
);
