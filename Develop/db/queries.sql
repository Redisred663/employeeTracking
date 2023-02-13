SELECT department.dep_name AS departments, roles.department_id 
FROM roles 
LEFT JOIN department 
  ON roles.department_id = department.id 
ORDER BY department.dep_name;
