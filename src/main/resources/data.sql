INSERT INTO GROUPS (name, title) VALUES 
  ('group1', 'title1'),
  ('group2', 'title2');
  
INSERT INTO USERS (name, title) VALUES 
  ('user1', 'title1'),
  ('user2', 'title2');

INSERT INTO GROUPS_USERS (group_id, users_id) VALUES 
  (1, 1),
  (1, 2);
