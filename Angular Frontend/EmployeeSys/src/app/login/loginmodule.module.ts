import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
 
@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        LoginRoutingModule,
        MatFormFieldModule, 
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        FormsModule
    ], providers: [],
    bootstrap: [LoginComponent]
})
export class Loginmodule { }
