import { Component, HostBinding, Input } from '@angular/core';
import { SectionDataInterface } from '../../interfaces/sectionData.interface';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @HostBinding('class') class = 'mat-section';

  @Input() sectionData!: SectionDataInterface;
}
