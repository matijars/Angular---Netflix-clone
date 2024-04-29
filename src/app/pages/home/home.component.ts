import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SectionComponent } from '../../components/section/section.component';
import { LandingComponent } from '../../components/landing/landing.component';
import { SectionData } from '../../helpers/section.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, LandingComponent, SectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sectionData = SectionData;
}
