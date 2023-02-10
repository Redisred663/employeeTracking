INSERT INTO department (dep_name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO roles (department_id, title, salary)
VALUES (2, "Finance", 93664),
(0, "Sales", 61151),
(3, "Legal", 142368),
(1, "Engineering", 91010);

INSERT INTO employees (last_name,first_name, role_id)
VALUES ("Red", "Alyssa", 1),
("Black", "Zavier", 2),
("Brown", "Patrick", 3);

UPDATE employees SET manager_id = 2
WHERE id=1 or id=4 or id =3 or id =6;