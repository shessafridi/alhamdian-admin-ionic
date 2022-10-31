import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { getVideoId } from '../helpers/getYoutubeVideoId';

@Directive({
  selector: '[youtubeLinkValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: YoutubeLinkValidatorDirective,
      multi: true,
    },
  ],
})
export class YoutubeLinkValidatorDirective implements Validator {
  constructor() {}

  validate(control: FormControl): ValidationErrors | null {
    if (control.value.trim()) {
      const id = getVideoId(control.value);
      if (!id) {
        return {
          youtubeLinkValidator: { valid: false },
        };
      }
    }
    return null;
  }
}
