import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmpformComponent } from './empform.component';
import { EmpformRoutingModule } from './empform-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
 
@NgModule({
    declarations: [EmpformComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        EmpformRoutingModule,
        MatFormFieldModule, 
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        FormsModule
    ], providers: [],
    bootstrap: [EmpformComponent]
})
export class EmpformModule { }
