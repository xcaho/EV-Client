import {Component} from '@angular/core'
import {Router} from "@angular/router";
import {AdminService} from "../../../shared/services/admin.service";
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {ClipboardService} from "ngx-clipboard";
import {AlertService} from "../../../common/alerts/service/alert.service";
import {RoleToView} from "../../../shared/enums/role-to-view";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-new-user-details',
  templateUrl: './new-user-details.component.html',
  styleUrls: ['./new-user-details.component.scss']
})

export class NewUserDetailsComponent {
  public login: string = '';
  public password: string = '';
  public role: string = '';
  public name: string = '';
  public isPasswordShown: boolean = false;
  public buttonTitle: string = "Pokaż hasło";
  public eye = faEye;
  public eyeSlash = faEyeSlash;
  public copy = faCopy;
  private token: string | null = null;

  constructor(private router: Router,
              private adminService: AdminService,
              private clipboardService: ClipboardService,
              private alertService: AlertService,
              private authService: AuthService,
              ) {
    this.token = this.authService.token;
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.login = navigation.extras.state['login'];
      this.password = navigation.extras.state['password'];
      this.role = RoleToView[navigation.extras.state['role'] as keyof typeof RoleToView];
      this.name = navigation.extras.state['name'];

    } else {
      this.alertService.showError('Wystąpił bład, spróbuj ponownie.')
    }
  }

  ngOnInit() {
    if (this.authService.isTokenExpired(this.token)) {
      this.authService.removeToken();
      this.authService.saveURL(this.router);
      this.router.navigate(['/login']);
    }
  }

  public passwordShowToggler() {
    this.isPasswordShown = !this.isPasswordShown;
    if (!this.isPasswordShown) {
      this.buttonTitle = 'Pokaż hasło';
    } else {
      this.buttonTitle = 'Ukryj hasło';
    }
  }

  public copyToClipboard(password: string) {
    this.clipboardService.copyFromContent(password);
    this.alertService.showInfo('Skopiowano hasło tymczasowe.')
  }
}
