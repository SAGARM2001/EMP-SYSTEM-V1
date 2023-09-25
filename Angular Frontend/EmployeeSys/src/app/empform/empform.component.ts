import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Import AbstractControl
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {
  empForm: FormGroup;
  employees: any[] = [];
  users: any[] = [];
  editingRow: number | null = null;
  selectedEmployee: any | null = null;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.empForm = this.fb.group({
      firstName: [
        '', // Initial value
        [
          Validators.required,
          Validators.pattern(/^[A-Z][a-zA-Z]+$/), // Start with uppercase, and only alphabets
          Validators.minLength(3), // Minimum length of 3 characters
        ],
      ],
      lastName: [
        '', // Initial value
        [
          Validators.required,
          Validators.pattern(/^[A-Z][a-zA-Z]+$/), // Start with uppercase, and only alphabets
          Validators.minLength(5), // Minimum length of 5 characters
        ],
      ],
      contact: [
        '', // Initial value
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/), // Exactly 10 digits
        ],
      ],
      email: [
        '', // Initial value
        [
          Validators.required,
          Validators.email, // Email format validation
        ],
      ],
      dob: [
        '', // Initial value
        [Validators.required],
      ],
      address: [
        '', // Initial value
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  // SUBMIT KELA KI ADD HOEL
  // onSubmit() {
  //   if (this.empForm.valid) {
  //     const formData = this.empForm.value;

  //     // Send the form data to your Express server
  //     this.http.post('http://localhost:3000/api/emp', formData).subscribe(
  //       (response) => {
  //         console.log('Form data sent successfully:', response);
  //         this.empForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error while submitting form data:', error);
  //       }
  //     );
  //   }
  // }

  // EMPLOYEE DATA RETRIEVE HOEL
  getEmployeeData() {
    this.http.get('http://localhost:3000/api/data').subscribe(
      (response: any) => {
        this.employees = response.data; // Store the retrieved employee data
      },
      (error) => {
        console.error('Error while retrieving employee data:', error);
      }
    );
  }

  // DELETE EMPLOYEE
  // deleteUser(empId: number) {
  //   this.http.delete<any>(`http://localhost:3000/api/users/${empId}`).subscribe(
  //     (response) => {
  //       if (response.message === 'User Deleted Successfully!') {
  //         this.users = this.users.filter((user) => user.emp_id !== empId);
  //         alert('User Deleted Successfully')
  //         window.location.reload();
  //       }
  //       else {
  //         console.error('User Deletion Failed:', response.message);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error during user deletion:', error);
  //     }
  //   )
  // }

  editUser(employee: any) {
    this.selectedEmployee = employee;
    this.empForm.patchValue({
      firstName: employee.fname,
      lastName: employee.lname,
      contact: employee.contact,
      email: employee.email,
      dob: employee.dob,
      address: employee.address,
    });
    this.editingRow = employee.emp_id;
  }


  // DELETE EMPLOYEE
  deleteUser(empId: number) {
    this.http.delete(`http://localhost:3000/api/users/${empId}`).subscribe(
      (response: any) => {
        if (response.message === 'User Deleted Successfully!') {
          this.users = this.users.filter((user) => user.emp_id !== empId);
          alert('User Deleted Successfully');
          window.location.reload();
        } else {
          console.error('User Deletion Failed:', response.message);
        }
      },
      (error) => {
        console.error('Error during user deletion:', error);
      }
    );
  }



  onUpdate() {
    if (this.empForm.valid) {
      const formData = {
        firstName: this.empForm.value.firstName,
        lastName: this.empForm.value.lastName,
        contact: this.empForm.value.contact,
        email: this.empForm.value.email,
        dob: this.empForm.value.dob,
        address: this.empForm.value.address,
      };
  
      // Log the formData to check if it's populated correctly
      console.log('FormData:', formData);
  
      if (this.selectedEmployee) {
        // Editing existing employee
        const empId = this.selectedEmployee.emp_id;
  
        // Log the empId and formData before making the HTTP request
        console.log('Updating Employee with ID:', empId);
        console.log('Updated Data:', formData);
  
        this.http.put(`http://localhost:3000/api/users/${empId}`, formData).subscribe(
          (response: any) => {
            if (response.message === 'User Updated Successfully!') {
              alert('User Updated Successfully');
              this.selectedEmployee = null;
              this.empForm.reset();
              this.editingRow = null;
              this.getEmployeeData();
            } else {
              console.error('User Update Failed:', response.message);
              window.location.reload();
              alert("User Updated Successfully")
            }
          },
          (error) => {
            console.error('Error during user update:', error);
          }
        );
      } else {
        // Adding a new employee
        // Send the form data to your Express server
        this.http.post('http://localhost:3000/api/emp', formData).subscribe(
          (response) => {
            console.log('User Added successfully:', response);
            alert("User Added Successfully")
            window.location.reload();
            this.empForm.reset();
          },
          (error) => {
            console.error('Error while submitting form data:', error);
          }
        );
      }
    }
  }
  




}
