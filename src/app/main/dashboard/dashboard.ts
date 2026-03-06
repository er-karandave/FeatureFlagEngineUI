import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { FeatureService, FeatureStatusResponse } from '../../shared/services/Features/feature-service';
import { catchError, map, of, take } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from '../../shared/services/Toast/toast-service';
import { FeatureState } from '../../shared/services/FeatureState/feature-state';



export interface NavItem {
  idFeature?: number;
  label: string;
  link: string;
  isActive: boolean;
  exact?: boolean;
  status?: string;

}



export interface Feature {
  idFeature: number;
  featureName: string;
  featureDetails: string;
  featureDisplayName: string;
  link?: string;
  isActive: boolean;
  createdOn: Date;
  createdBy: number;
  updatedOn?: Date;
  updatedBy?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {




  navItems = signal<NavItem[]>([]);


  isEditModalOpen = signal<boolean>(false);
  isDeleteModalOpen = signal<boolean>(false);
  featureDisplayName = signal('');
  featureLink = signal('');
  editingFeature = signal<Feature | null>(null);
  deletingFeatureId = signal<number | null>(null);

  constructor(private _featureService: FeatureService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastService,
    private _featureStateService: FeatureState
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
            status: feature.isActive === true ? 'Active' : 'Inactive',
            isActive: feature.isActive
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: any[]) => {
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
            status: feature.isActive === true ? 'Active' : 'Inactive',
            isActive: feature.isActive
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: any[]) => {
        this.navItems.set(navItems);
      });
  }

  getAllFeatures() {
    this._featureService.getAllFeatures(true)
      .pipe(
        take(1),
        map((features: Feature[]) =>
          features.map((feature) => ({
            idFeature: feature.idFeature,
            label: feature.featureDisplayName,
            link: feature.link,
            exact: false,
            status: (feature.isActive === true) ? 'Active' : 'Inactive',
            isActive: feature.isActive
          }))
        ),
        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: any[]) => {
        this.navItems.set(navItems);
      });
  }

  openEditModal(id: number) {
    this._featureService.getFeaturesByFeatureId(id)
      .pipe(take(1))
      .subscribe({
        next: (feature: any) => {
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

    console.log(updatedFeature);
    // this._featureService.updateFeature(updatedFeature)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: () => {
    //       this.closeEditModal();
    //       this.getAllFeatures(); 
    //     },
    //     error: (err) => console.error('Error updating feature', err)
    //   });
  }


  ChangeFeatureActiveStatus(featureId: number | undefined, newStatus: string) {
    const isActive = newStatus === 'Active';
    const originalStatus = newStatus;
    const features = this.navItems();
    this.navItems.set(features.map(f =>
      f.idFeature === featureId ? { ...f, status: newStatus } : f
    ));

    this._featureService.updateFeatureStatus(featureId, isActive).subscribe({
      next: (response: { success: boolean; message: string }) => {
        if (response.success) {
          this.showNotification(response.message, 'success');
          this._featureStateService.triggerFeatureRefresh();
        } else {
          this.revertStatus(featureId, originalStatus);
          this.showNotification(response.message, 'error');
        }
        this.getAllFeatures()
      },
      error: (err: any) => {
        this.revertStatus(featureId, originalStatus);

        let errorMessage = 'Failed to update status. Please try again.';

        if (err.status === 400 && err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.status === 0) {
          errorMessage = 'Network error. Please check your connection.';
        } else if (err.status === 500) {
          errorMessage = 'Server error. Please contact support.';
        }

        this.showNotification(errorMessage, 'error');
        this.getAllFeatures();
        console.error('Update error:', err);
      }
    });
  }

  private revertStatus(featureId: number | undefined, originalStatus: string) {
    const features = this.navItems();
    this.navItems.set(features.map(f =>
      f.idFeature === featureId ? { ...f, status: originalStatus } : f
    ));
  }

  private showNotification(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      console.log('✅', message);
      this.toastr.success(message);
    } else {
      console.error('❌', message);
      alert(message);
      this.toastr.error(message);
    }
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
      this._featureService.deleteFeatureById(id).subscribe({
        next: (response: any) => {
          this.showNotification(response.message, 'success');
          this.getAllFeatures();
          this.isDeleteModalOpen.set(false);
        },
        error: (errorResponse: any) => {
          const message = errorResponse?.error?.message
            || errorResponse?.message
            || 'Failed to delete feature. Please try again.';
          this.showNotification(message, 'error');
          this.isDeleteModalOpen.set(false);

        }
      });
    }
  }

}
