import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Unit } from 'devtoolz-library';
import { NavigationHelper } from 'src/shared/helpers/navigationHelper';
import { PageBase } from 'src/shared/pages/pageBase';
import { UnitUrlFormatterService } from 'src/converters/shared/services/unit-url-formatter.service';
import { TimeConverterService } from '../../services/time-converter.service';

@Component({
  selector: 'time-converter-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './time-converter-home-page.component.html',
  styleUrl: './time-converter-home-page.component.scss'
})
export class TimeConverterHomePageComponent extends PageBase implements OnInit, AfterViewInit {
  protected readonly groupedUnits: Array<{ key: Unit; units: Unit[] }> = [];

  constructor(
    protected readonly urlFormatter: UnitUrlFormatterService,
    protected readonly timeService: TimeConverterService
  ) {
    super();
    this._buildGroupedUnits();
  }

  private _buildGroupedUnits(): void {
    const units = this.timeService.getUnits();
    for (const key of units) {
      const others = units.filter(u => u.id !== key.id);
      this.groupedUnits.push({ key, units: others });
    }
  }

  ngOnInit(): void {
    const title = 'Conversor de Tempo';
    const description = 'Converta facilmente entre diferentes unidades de tempo como anos, semanas, dias, horas, minutos, segundos, milissegundos, microssegundos e picossegundos. Calculadora precisa com explicações detalhadas.';
    const keywords = 'conversor de tempo, converter horas, minutos para segundos, dias para horas, semanas para dias, milissegundos, microssegundos, picossegundos, calculadora de tempo';

    this.setTitle(title);
    this.addDescription(description);
    this.updateSeo({ title, description, keywords });
    this.addSchemaOrgData('SoftwareApplication', {
      name: title,
      description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web'
    });
  }

  ngAfterViewInit(): void {
    NavigationHelper.setupAnchorNavigation();
    NavigationHelper.setupScrollWatch(400);
  }
}
