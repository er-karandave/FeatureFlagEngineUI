import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { FeatureService } from '../../shared/services/Features/feature-service';
import { catchError, map, of, take } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


// export interface NavItem {
//   label: string;
//   link: string;
//   exact?: boolean;
// }

// export interface Feature {
//   idFeature: number;
//   featureDisplayName: string;
//   link: string;
// }

export interface NavItem {
  idFeature?: number; // Added to track feature for edit/delete
  label: string;
  link: string;
  exact?: boolean;
  status?: string; // Added to match the UI table status column
}

export interface Feature {
  idFeature: number;
  featureDisplayName: string;
  link: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {

  // navItems = signal<NavItem[]>([]);
  // constructor(private _featureService: FeatureService) {

  // }

  // ngOnInit() {
  //   this._featureService.getAllFeatures()
  //     .pipe(
  //       take(1),

  //       // Ensure API response is typed as Feature[]
  //       map((features: Feature[]) =>
  //         features.map((feature) => ({
  //           label: feature.featureDisplayName,
  //           link: feature.link,
  //           exact: false
  //         }))
  //       ),

  //       // Return proper type on error
  //       catchError(() => of<NavItem[]>([]))
  //     )
  //     .subscribe((navItems: NavItem[]) => {
  //       this.navItems.set(navItems);
  //       console.log(navItems)
  //     });    
  // }

  // getAllActiveFeatures(){
  //   this._featureService.getAllActiveFeatures()
  //     .pipe(
  //       take(1),

  //       // Ensure API response is typed as Feature[]
  //       map((features: Feature[]) =>
  //         features.map((feature) => ({
  //           label: feature.featureDisplayName,
  //           link: feature.link,
  //           exact: false
  //         }))
  //       ),

  //       // Return proper type on error
  //       catchError(() => of<NavItem[]>([]))
  //     )
  //     .subscribe((navItems: NavItem[]) => {
  //       this.navItems.set(navItems);
  //     });
  // }

  // getAllInActiveFeatures(){
  //   this._featureService.getAllInActiveFeatures()
  //     .pipe(
  //       take(1),

  //       // Ensure API response is typed as Feature[]
  //       map((features: Feature[]) =>
  //         features.map((feature) => ({
  //           label: feature.featureDisplayName,
  //           link: feature.link,
  //           exact: false
  //         }))
  //       ),

  //       // Return proper type on error
  //       catchError(() => of<NavItem[]>([]))
  //     )
  //     .subscribe((navItems: NavItem[]) => {
  //       this.navItems.set(navItems);
  //     });
  // }

  // getAllFeatures(){
  //   this._featureService.getAllFeatures()
  //     .pipe(
  //       take(1),

  //       // Ensure API response is typed as Feature[]
  //       map((features: Feature[]) =>
  //         features.map((feature) => ({
  //           label: feature.featureDisplayName,
  //           link: feature.link,
  //           exact: false
  //         }))
  //       ),

  //       // Return proper type on error
  //       catchError(() => of<NavItem[]>([]))
  //     )
  //     .subscribe((navItems: NavItem[]) => {
  //       this.navItems.set(navItems);
  //     });
  // }


  navItems = signal<NavItem[]>([]);
  

  // Modal State Signals
  isEditModalOpen = signal<boolean>(false);
  isDeleteModalOpen = signal<boolean>(false);
featureDisplayName = signal('');
featureLink = signal('');
  // Selected Data Signals
  editingFeature = signal<Feature | null>(null);
  deletingFeatureId = signal<number | null>(null);

  constructor(private _featureService: FeatureService,
    private cdr: ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    this.getAllFeatures();
  }

  getAllActiveFeatures() {
    this._featureService.getAllActiveFeatures()
      .pipe(
        take(1),
        map((features: Feature[]) =>
          features.map((feature) => ({
            idFeature: feature.idFeature,
            label: feature.featureDisplayName,
            link: feature.link,
            exact: false,
            status: 'Active'
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: NavItem[]) => {
        this.navItems.set(navItems);
      });
  }

  getAllInActiveFeatures() {
    this._featureService.getAllInActiveFeatures()
      .pipe(
        take(1),
        map((features: Feature[]) =>
          features.map((feature) => ({
            idFeature: feature.idFeature,
            label: feature.featureDisplayName,
            link: feature.link,
            exact: false,
            status: 'Inactive'
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: NavItem[]) => {
        this.navItems.set(navItems);
      });
  }

  getAllFeatures() {
    this._featureService.getAllFeatures()
      .pipe(
        take(1),
        map((features: Feature[]) =>
          features.map((feature) => ({
            idFeature: feature.idFeature,
            label: feature.featureDisplayName,
            link: feature.link,
            exact: false,
            status: 'Active' // Replace with actual status logic if your Feature model has it
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: NavItem[]) => {
        this.navItems.set(navItems);
      });
  }

  // --- EDIT LOGIC ---
  openEditModal(id: number) {
  this._featureService.getFeaturesByFeatureId(id)
    .pipe(take(1))
    .subscribe({
      next: (feature: any) => {
        // ✅ Signals — no FormGroup, no DOM timing, no CD issues
        console.log(feature[0].featureDisplayName)
        this.featureDisplayName.set(feature[0].featureDisplayName);
        this.featureLink.set(feature[0].link);
        this.editingFeature.set(feature);
        this.isEditModalOpen.set(true);
      },
      error: (err) => console.error(err)
    });
}

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.editingFeature.set(null);
    this.cdr.detectChanges();
  }
  saveEdit() {
  const currentFeature = this.editingFeature();
  if (!currentFeature) return;

  const updatedFeature: Feature = {
    ...currentFeature,
    featureDisplayName: this.featureDisplayName(),
    link: this.featureLink()
  };

  console.log(updatedFeature); // ✅ correct values
  // Assumes FeatureService has an updateFeature method
    // this._featureService.updateFeature(updatedFeature)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: () => {
    //       this.closeEditModal();
    //       this.getAllFeatures(); // Refresh table
    //     },
    //     error: (err) => console.error('Error updating feature', err)
    //   });
}

  // saveEdit(value: any) {
  //   const currentFeature = this.editingFeature();
  //   if (!currentFeature) return;

  //   const updatedFeature: Feature = {
  //     ...currentFeature,
  //     featureDisplayName: value.name,
  //     link: value.link
  //   };

  //   console.log(value)
  //   // Assumes FeatureService has an updateFeature method
  //   // this._featureService.updateFeature(updatedFeature)
  //   //   .pipe(take(1))
  //   //   .subscribe({
  //   //     next: () => {
  //   //       this.closeEditModal();
  //   //       this.getAllFeatures(); // Refresh table
  //   //     },
  //   //     error: (err) => console.error('Error updating feature', err)
  //   //   });
  // }

  // --- DELETE LOGIC ---

  openDeleteModal(id: number) {
    this.deletingFeatureId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.deletingFeatureId.set(null);
  }

  confirmDelete() {
    const id = this.deletingFeatureId();
    if (id !== null) {
      // Assumes FeatureService has a deleteFeature method
      this._featureService.deleteFeature(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.closeDeleteModal();
            this.getAllFeatures(); // Refresh table
          },
          error: (err) => console.error('Error deleting feature', err)
        });
    }
  }

}
