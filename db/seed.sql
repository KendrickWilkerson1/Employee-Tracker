
INSERT INTO department (name) 
VALUES ('Sales'), 
       ('Marketing'),
       ('Tech'),
       ('Financing');

INSERT INTO role (title, salary, department_id) 
VALUES ('Lead Software Engineer', 200000, 3), 
       ('Jr Software Engineer', 75000, 3), 
       ('Lead Accountant', 110000, 4), 
       ('Jr Accountant', 85000, 4), 
       ('Marketing Manager', 95000, 2), 
       ('Marketing Intern', 60000, 2), 
       ('Sales Manager', 250000, 1), 
       ('Salesperson', 100000, 1);



INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Michael', 'Scott', 7, NULL),
       ('Jim', 'Halpert', 8, 1),
       ('Pam', 'Halpert', 5, NULL),
       ('Kelly', 'Kapoor', 6, 3),
       ('Oscar', 'Martinez', 3, NULL),
       ('Kevin', 'Malone', 4, 5),
       ('Dwight', 'Schrute', 1, NULL),
       ('Andy', 'Bernard', 2, 7);
