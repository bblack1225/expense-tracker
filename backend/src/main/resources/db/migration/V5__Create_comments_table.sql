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