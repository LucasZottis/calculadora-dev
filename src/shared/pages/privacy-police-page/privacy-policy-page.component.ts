import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageBase } from '../pageBase';

@Component({
  selector: 'privacy-policy-page',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy-page.component.html',
  styleUrl: './privacy-policy-page.component.scss'
})
export class PrivacyPolicyPageComponent extends PageBase implements OnInit {
  ngOnInit(): void {
    this.addDescription('Política de Privacidade e Cookies - Saiba como utilizamos seus dados.');
    this.setTitle('Política de Privacidade');
  }
}