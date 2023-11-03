import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, tap } from 'rxjs';
import { Profile } from 'src/app/features/users/profile.model';
import { UserService } from 'src/app/features/users/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private domSanitizer = inject(DomSanitizer);
  profile$!: Observable<Profile>;
  profilePhoto!: SafeResourceUrl;

  ngOnInit(): void {
    this.profile$ = this.userService.getUserProfile();
    this.userService.getUserProfile()
    .pipe(
      tap((profile: Profile) => { 
        console.log('profile', profile);
      } 
    ))
    .subscribe();
  }

  getProfilePhoto() {
    return this.userService.getUserProfilePhoto()
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(photo => {
      const urlCreator = window.URL || window.webkitURL;
      this.profilePhoto = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(photo));
    });
  }

}
