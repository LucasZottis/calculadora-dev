import { Inject, Injectable, Optional } from '@angular/core';
import { ConvertersBaseService } from 'src/converters/shared/services/converter-base/converter-base.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeConverterService extends ConvertersBaseService {
  constructor() {
    super('volume',);
  }
}