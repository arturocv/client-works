import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorksService } from '../../services/works.service';
import { Work } from '../../interfaces/work.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-new-page',
	standalone: false,
	templateUrl: './new-page.component.html',
	styles: ``
})
export class NewPageComponent implements OnInit {

	public workForm = new FormGroup({
		id: new FormControl<string>(''),
		title: new FormControl<string>('', { nonNullable: true }),
		description: new FormControl<string>('', { nonNullable: true }),
		complete: new FormControl<boolean>(false, { nonNullable: true })
	});


	constructor(
		private worksService: WorksService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
	) { }


	get currentWork(): Work {
		const work = this.workForm.value as Work;
		return work;
	}

	ngOnInit(): void {

		if (!this.router.url.includes('edit')) return;

		this.activatedRoute.params.pipe(
			switchMap(({ id }) => this.worksService.getWorksById(id))
		).subscribe(work => {
			if (!work) return this.router.navigateByUrl('/');
			this.workForm.reset(work);
			return;
		});
	}

	onSubmit(): void {
		if (this.workForm.invalid) return;

		const id = this.activatedRoute.snapshot.paramMap.get('id');

		if (id) {
			if (this.router.url.includes('edit')) {
				const updateWrok: Work = {
					_id: id,
					title: this.currentWork.title,
					description: this.currentWork.description,
					complete: this.currentWork.complete,
				}

				this.worksService.updateWorks(updateWrok)
		        .subscribe( work => {
		          this.showSnackbar(`${ updateWrok.title} actualizado!`);
              this.router.navigateByUrl('/');
		        });

            return;
			}
		}

		this.worksService.createWorks(this.currentWork)
		    .subscribe(work => {
		      this.showSnackbar(`Tarea creada correctamente!`);
          this.router.navigateByUrl('/');
		    });

        return;
	}

  showSnackbar(message: string):void{
    this.snackbar.open(message, 'cerrar', {
      duration: 2500,
    })
  }

  onDeleteWork():void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: this.workForm.value,
      });

      dialogRef.afterClosed()
        .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this.worksService.deleteWorkById(id)),
          filter( (wasDeleted: boolean) => wasDeleted ),
        )
        .subscribe(() => {
          this.router.navigate(['/works']);
        });

    }
  }
}
