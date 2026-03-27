import { Component, Input, input } from '@angular/core';
import { Unit } from 'devtoolz-library';

@Component({
  selector: 'converter-title',
  standalone: true,
  imports: [],
  templateUrl: './converter-title.component.html',
  styleUrl: './converter-title.component.scss'
})

export class ConverterTitleComponent {
  @Input() sourceUnit!: Unit;
  @Input() targetUnit!: Unit;
}