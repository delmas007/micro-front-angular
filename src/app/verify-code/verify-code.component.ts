import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../Service/api.service";

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnInit {
  digits: string[] = new Array(6).fill('');
  isError: boolean = false;
  resendDisabled: boolean = false;
  countdownTimer: number = 3;
  email!: string ;

  constructor(private apiService: ApiService, private http: HttpClient,private router: Router,private activatedRoute : ActivatedRoute) {}

  ngOnInit() {

  }



  verifyCode() {
    const code = this.digits.join('');
    console.log('Vérification du code:', code);
    this.email = this.activatedRoute.snapshot.params['email']
    this.apiService.Verification(code)
      .then((response: any) => {
        console.log(response)
        if (response == 1){
         console.log('code valide')
        }else{
          this.isError = true;
          setTimeout(() => this.isError = false, 5000);
        }
      })
      .catch(error => {
        console.error('Échec de la validation du code.', error);
        this.isError = true;
        setTimeout(() => this.isError = false, 5000);
      });
  }




  onModelChange(value: any, index: number) {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue.match(/^[0-9]$/) && index < this.digits.length) {
      this.digits[index] = trimmedValue;

      if (index < this.digits.length - 1) {
        const nextInput = document.getElementById('input_' + (index + 1)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        this.verifyCode();
      }
    } else {
      this.digits[index] = '';
    }

    console.log('État actuel des chiffres:', this.digits);
  }


}
