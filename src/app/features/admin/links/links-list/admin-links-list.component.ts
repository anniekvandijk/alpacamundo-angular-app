import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Link } from 'src/app/features/links/link.model';
import { LinkService } from 'src/app/features/links/link.service';

@Component({
  selector: 'app-admin-links-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-links-list.component.html',
  styleUrl: './admin-links-list.component.scss'
})
export class AdminLinksListComponent {
  readonly destroyRef = inject(DestroyRef);
  public componentId = this.constructor.name;
  private linkService = inject(LinkService);

  public links!: Link[];

  ngOnInit(): void {
    this.getLinks();
  }

  private getLinks() {
    this.linkService.getLinks(this.componentId)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(links => {
      this.links = links;
    });
  }

}
