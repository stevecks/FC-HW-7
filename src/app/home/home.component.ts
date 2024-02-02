import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        //overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
        //overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('800ms ease-in-out')
      ]),
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('800ms ease-in-out')
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  public userName: string = '';
  public _onAbout: boolean = false;
  public _onFunctional: boolean = false;
  public _onIdeas: boolean = false;

  public isExpandedAbout = false;
  public isExpandedFunctional = false;
  public isExpandedIdeas = false;

  constructor(
    public authService: AuthService,
  ) { }
  
  public ngOnInit() {
    this.userName = '';
  }

  public toggleAnimation(card: string) {
    if (card === "about") this.isExpandedAbout = !this.isExpandedAbout;
    if (card === "functional") this.isExpandedFunctional = !this.isExpandedFunctional;
    if (card === "ideas") this.isExpandedIdeas = !this.isExpandedIdeas;
  }

  public getUserName(): string {
    return this.authService._userName;
  }

}
