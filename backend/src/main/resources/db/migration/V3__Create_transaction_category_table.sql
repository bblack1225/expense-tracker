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