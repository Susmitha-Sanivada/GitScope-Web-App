import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info.component';
import { UserData } from '../../model';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit setPageNumber event', () => {
    const pageNumber = 2;
    const emitSpy = spyOn(component.setPageNumber, 'emit');
    component.input_page_size = pageNumber;
    component.setPageNumber.emit(pageNumber);
    expect(emitSpy).toHaveBeenCalledWith(pageNumber);
  });
  it('should have default input_page_size set to 10', () => {
    expect(component.input_page_size).toEqual(10);
  });

  it('should have null userData by default', () => {
    expect(component.userData).toBeNull();
  });

  it('should set userData when provided through @Input', () => {
    const mockUserData: UserData = {
      avatar_url: 'avatar_url',
      name: 'name',
      bio: 'bio',
      followers: 1,
      following: 1,
      location: 'location',
      public_repos: 1,
    };
    component.userData = mockUserData;
    expect(component.userData).toEqual(mockUserData);
  });
});
