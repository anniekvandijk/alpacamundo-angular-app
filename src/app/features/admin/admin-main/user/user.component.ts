import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, tap, map } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private domSanitizer = inject(DomSanitizer);
  public user!: User;
  public profilePhoto!: SafeResourceUrl;

  ngOnInit(): void {
    this.getUser();
    this.getPhoto();
  }

  private getUser() {
    this.userService.getUser()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(user => console.log(user))
    )
    .subscribe(user => {
      this.user = user;
    });
  }

  private getPhoto() {
    return this.userService.getUserPhoto()
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(photo => {
      const urlCreator = window.URL || window.webkitURL;
      this.profilePhoto = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(photo));
    });
  }

}
