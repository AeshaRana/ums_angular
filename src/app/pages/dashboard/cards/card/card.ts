import { Component, Input, input } from '@angular/core';
import { Card } from "primeng/card";

@Component({
  selector: 'app-card',
  imports: [Card],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input({required:true}) title! :string;
  @Input({required:true}) value!:string
}
