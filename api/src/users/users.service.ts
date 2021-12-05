import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { FilesService } from '../files/files.service';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { async } from 'rxjs';
import { access } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
    private connection: Connection,
  ) {}
  async getManagementToken() {
    const url = 'https://openbeats716.us.auth0.com/oauth/token';
    const data = {
      grant_type: 'client_credentials',
      client_id: 'BPcmWSukav5Id87DO8yNeWncLGHE5FXv',
      client_secret:
        'SPAf-ynDFezy2-iIUjT3OoA56XYs0YlIndlm3Wxz2OkHOWDuGlADJt8B525HI_T6',
      audience: 'https://openbeats716.us.auth0.com/api/v2/',
    };
    const headers = {
      'content-type': 'application/json',
    };
    const u = await axios
      .post(url, data, { headers: headers })
      .then(function (response) {
        console.log(response.data.user_metadata.bio);
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return JSON.stringify(u.access_token);
  }

  async UC(id: string, category, gene: string) {
    const url = 'https://openbeats716.us.auth0.com/oauth/token';
    const data = {
      grant_type: 'client_credentials',
      client_id: 'jI9mS72sGlalASIgjt6CT7kDZHPOcTTP',
      client_secret:
        'SO31HbPs8qxpTv8AM_jDVcM8xK9nefd0k8i33lN5FYdSLJm_f-CdU_6YN8BNjNhM',
      audience: 'https://openbeats716.us.auth0.com/api/v2/',
    };
    const headers = {
      'content-type': 'application/json',
    };
    let token = await axios
      .post(url, data, { headers: headers })
      .then((response) => {
        // console.log('Got the jwt token' + response.data);
        const pretty = JSON.stringify(response.data.access_token);
        console.log('Pretty = ' + pretty);
        return pretty;
        /* this is promise and data.access_token is the token*/
      })
      .catch(function (error) {
        return error;
      });

    // console.log('first req finished and token is' + token);
    const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
    const headers_token = {
      // Authorization: `Bearer ${token}`,
      authorization: 'Bearer ' + token,
      // 'content-type': 'application/json',
    };
    console.log('TOKENNN' + token);
    const data2 = {
      user_metadata: {
        [category]: gene,
      },
    };
    token = JSON.parse(token);
    console.log('Changed now to ' + token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    };
    console.log(config);
    const rest = await axios
      .patch(user, data2, config)
      .then((res) => {
        console.log('Got the response after setting value');
        console.log(res.data);
        return res.data.user_metadata;
      })
      .catch((err) => console.error(err));
    return rest;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async getByGenre(genre: string) {
    const GenreList: unknown = await this.usersRepository.find({ genre });
    if (GenreList) {
      return GenreList;
    }
    throw new HttpException(
      'Users with this genre does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  // async UpdateCategory(id: string, category, gene: string) {
  //   console.log(category, id, gene);
  //   const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
  //   const tok = await this.getManagementToken();
  //   console.log(tok);
  //   // const token =
  //   //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZBUFliSHRYY3NMYWNaZk9nQzlyNSJ9.eyJpc3MiOiJodHRwczovL29wZW5iZWF0czcxNi51cy5hdXRoMC5jb20vIiwic3ViIjoiakk5bVM3MnNHbGFsQVNJZ2p0NkNUN2tEWkhQT2NUVFBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vb3BlbmJlYXRzNzE2LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4MjgyODQ3LCJleHAiOjE2NDA4NzQ4NDcsImF6cCI6ImpJOW1TNzJzR2xhbEFTSWdqdDZDVDdrRFpIUE9jVFRQIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.qcXPhKO5lh09wwgdUjfVaMAvy-KCX4wituvZR_Rl3YxsUPS17w8e_PuJU46CXeX-Dpi9-wsAItNylR7XzQHAAdTAjbu-yzEaGHvtrXuB1Aa4XUKO5Mq_7r-2Wprp1938zS-EeoT_nVG2KJSXAmXzde1m5mT_7NTqIFzd84cE0NuukhQGZc5vQXLrli2uNW8ZABUzRg9Vbwlnz08D1X_A6ULNX3LOxbjas2gcbx2rQGK_47fFJYNgP8XCSeFmWYHcF9SPKKYl-TC7xN07qHZ5yv40SGDP_rN6VOaDhR81kNt7aGxMsO62FiZ5gR1uuQ37ttBrPq2NdLtBvVvMybLnXg';
  //   const data = {
  //     user_metadata: {
  //       [category]: gene,
  //     },
  //   };
  //   const headers = {
  //     authorization: 'Bearer ' + tok,
  //     'content-type': 'application/json',
  //   };
  //   const u = await axios
  //     .patch(user, data, { headers: headers })
  //     .then(function (response) {
  //       console.log(response.data.user_metadata.bio);
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       return error;
  //     });
  //   return u;
  // }

  async getProfileDetails(id: string) {
    const url = 'https://openbeats716.us.auth0.com/oauth/token';
    const data = {
      grant_type: 'client_credentials',
      client_id: 'jI9mS72sGlalASIgjt6CT7kDZHPOcTTP',
      client_secret:
        'SO31HbPs8qxpTv8AM_jDVcM8xK9nefd0k8i33lN5FYdSLJm_f-CdU_6YN8BNjNhM',
      audience: 'https://openbeats716.us.auth0.com/api/v2/',
    };
    const headers = {
      'content-type': 'application/json',
    };
    let token = await axios
      .post(url, data, { headers: headers })
      .then((response) => {
        // console.log('Got the jwt token' + response.data);
        const pretty = JSON.stringify(response.data.access_token);
        console.log('Pretty = ' + pretty);
        return pretty;
        /* this is promise and data.access_token is the token*/
      })
      .catch(function (error) {
        return error;
      });

    // console.log('first req finished and token is' + token);
    const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
    const headers_token = {
      // Authorization: `Bearer ${token}`,
      authorization: 'Bearer ' + token,
      // 'content-type': 'application/json',
    };
    token = JSON.parse(token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    };
    console.log(config);
    const rest = await axios
      .get(user, config)
      .then((res) => {
        console.log('Got the response after setting value');
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.error(err));
    return rest;
  }

  async UpdateName(id: string, category, gene: string) {
    const url = 'https://openbeats716.us.auth0.com/oauth/token';
    const data = {
      grant_type: 'client_credentials',
      client_id: 'jI9mS72sGlalASIgjt6CT7kDZHPOcTTP',
      client_secret:
        'SO31HbPs8qxpTv8AM_jDVcM8xK9nefd0k8i33lN5FYdSLJm_f-CdU_6YN8BNjNhM',
      audience: 'https://openbeats716.us.auth0.com/api/v2/',
    };
    const headers = {
      'content-type': 'application/json',
    };
    let token = await axios
      .post(url, data, { headers: headers })
      .then((response) => {
        // console.log('Got the jwt token' + response.data);
        const pretty = JSON.stringify(response.data.access_token);
        console.log('Pretty = ' + pretty);
        return pretty;
        /* this is promise and data.access_token is the token*/
      })
      .catch(function (error) {
        return error;
      });

    // console.log('first req finished and token is' + token);
    const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
    const headers_token = {
      // Authorization: `Bearer ${token}`,
      authorization: 'Bearer ' + token,
      // 'content-type': 'application/json',
    };
    console.log('TOKENNN' + token);
    const data2 = {
      [category]: gene,
    };
    token = JSON.parse(token);
    console.log('Changed now to ' + token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    };
    console.log(config);
    const rest = await axios
      .patch(user, data2, config)
      .then((res) => {
        console.log('Got the response after setting value');
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.error(err));
    return rest;
  }

  async UpdateFirstName(id: string, FirstName: string) {
    const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZBUFliSHRYY3NMYWNaZk9nQzlyNSJ9.eyJpc3MiOiJodHRwczovL29wZW5iZWF0czcxNi51cy5hdXRoMC5jb20vIiwic3ViIjoiQlBjbVdTdWthdjVJZDg3RE84eU5lV25jTEdIRTVGWHZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vb3BlbmJlYXRzNzE2LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4NTc5MTM5LCJleHAiOjE2NDExNzExMzksImF6cCI6IkJQY21XU3VrYXY1SWQ4N0RPOHlOZVduY0xHSEU1Rlh2IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.bby4w1txq3KSzV-XoXc07r0dddezdMxStwEiuu_i5AEY0ce0VdlY-FQgGN3aHxENsZrEMBVobiyqsbu74UsqC770C_v77QXfChdljDJjBclHn7aKSFzVAUGaazrw_9AcGS7PrP7IthskDJcNkkmAN1LRQEB1AWvM6o8fgaNWmPW-PUdcpKmCRJiYra4O3akNs0Mm0lnWZVoGYaPrfyBYHjYSC7m8aXkzKtcUEk2mdLcr7MIE_ycHtKwIHR5jbA5RhqqaG9-mmHH5jjjledDeata568g5NCEgosla_36YDgRKmYOh9B2qAqf5bPbmQS4ItN4koAF8Oc3QvNsKipl00Q';
    // const token =
    //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZBUFliSHRYY3NMYWNaZk9nQzlyNSJ9.eyJpc3MiOiJodHRwczovL29wZW5iZWF0czcxNi51cy5hdXRoMC5jb20vIiwic3ViIjoiakk5bVM3MnNHbGFsQVNJZ2p0NkNUN2tEWkhQT2NUVFBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vb3BlbmJlYXRzNzE2LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4MjgyODQ3LCJleHAiOjE2NDA4NzQ4NDcsImF6cCI6ImpJOW1TNzJzR2xhbEFTSWdqdDZDVDdrRFpIUE9jVFRQIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.qcXPhKO5lh09wwgdUjfVaMAvy-KCX4wituvZR_Rl3YxsUPS17w8e_PuJU46CXeX-Dpi9-wsAItNylR7XzQHAAdTAjbu-yzEaGHvtrXuB1Aa4XUKO5Mq_7r-2Wprp1938zS-EeoT_nVG2KJSXAmXzde1m5mT_7NTqIFzd84cE0NuukhQGZc5vQXLrli2uNW8ZABUzRg9Vbwlnz08D1X_A6ULNX3LOxbjas2gcbx2rQGK_47fFJYNgP8XCSeFmWYHcF9SPKKYl-TC7xN07qHZ5yv40SGDP_rN6VOaDhR81kNt7aGxMsO62FiZ5gR1uuQ37ttBrPq2NdLtBvVvMybLnXg';
    const data = {
      given_name: FirstName,
    };
    const headers = {
      authorization: 'Bearer ' + token,
      'content-type': 'application/json',
    };
    const u = await axios
      .patch(user, data, { headers: headers })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return u.given_name;
  }

  async UpdateLastName(id: string, LastName: string) {
    const user = 'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + id;
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZBUFliSHRYY3NMYWNaZk9nQzlyNSJ9.eyJpc3MiOiJodHRwczovL29wZW5iZWF0czcxNi51cy5hdXRoMC5jb20vIiwic3ViIjoiakk5bVM3MnNHbGFsQVNJZ2p0NkNUN2tEWkhQT2NUVFBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vb3BlbmJlYXRzNzE2LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4MjgyODQ3LCJleHAiOjE2NDA4NzQ4NDcsImF6cCI6ImpJOW1TNzJzR2xhbEFTSWdqdDZDVDdrRFpIUE9jVFRQIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.qcXPhKO5lh09wwgdUjfVaMAvy-KCX4wituvZR_Rl3YxsUPS17w8e_PuJU46CXeX-Dpi9-wsAItNylR7XzQHAAdTAjbu-yzEaGHvtrXuB1Aa4XUKO5Mq_7r-2Wprp1938zS-EeoT_nVG2KJSXAmXzde1m5mT_7NTqIFzd84cE0NuukhQGZc5vQXLrli2uNW8ZABUzRg9Vbwlnz08D1X_A6ULNX3LOxbjas2gcbx2rQGK_47fFJYNgP8XCSeFmWYHcF9SPKKYl-TC7xN07qHZ5yv40SGDP_rN6VOaDhR81kNt7aGxMsO62FiZ5gR1uuQ37ttBrPq2NdLtBvVvMybLnXg';
    const data = {
      family_name: LastName,
    };
    const headers = {
      authorization: 'Bearer ' + token,
      'content-type': 'application/json',
    };
    const u = await axios
      .patch(user, data, { headers: headers })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return u.family_name;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async addAvatar(userId: number, img: Express.Multer.File) {
    const user =
      'https://openbeats716.us.auth0.com/api/v2/users/auth0|' + userId;
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZBUFliSHRYY3NMYWNaZk9nQzlyNSJ9.eyJpc3MiOiJodHRwczovL29wZW5iZWF0czcxNi51cy5hdXRoMC5jb20vIiwic3ViIjoiakk5bVM3MnNHbGFsQVNJZ2p0NkNUN2tEWkhQT2NUVFBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vb3BlbmJlYXRzNzE2LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM4MjgyODQ3LCJleHAiOjE2NDA4NzQ4NDcsImF6cCI6ImpJOW1TNzJzR2xhbEFTSWdqdDZDVDdrRFpIUE9jVFRQIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.qcXPhKO5lh09wwgdUjfVaMAvy-KCX4wituvZR_Rl3YxsUPS17w8e_PuJU46CXeX-Dpi9-wsAItNylR7XzQHAAdTAjbu-yzEaGHvtrXuB1Aa4XUKO5Mq_7r-2Wprp1938zS-EeoT_nVG2KJSXAmXzde1m5mT_7NTqIFzd84cE0NuukhQGZc5vQXLrli2uNW8ZABUzRg9Vbwlnz08D1X_A6ULNX3LOxbjas2gcbx2rQGK_47fFJYNgP8XCSeFmWYHcF9SPKKYl-TC7xN07qHZ5yv40SGDP_rN6VOaDhR81kNt7aGxMsO62FiZ5gR1uuQ37ttBrPq2NdLtBvVvMybLnXg';
    const options = {
      method: 'PATCH',
      url: user,
      headers: {
        authorization: 'Bearer ' + token,
        'content-type': 'application/json',
      },
      data: {
        picture: img,
      },
    };
    // if (user.avatar) {
    //   await this.usersRepository.update(userId, {
    //     ...user,
    //     avatar: null,
    //   });
    //   await this.filesService.deletePublicFile(user.avatar.id);
    // }
    // const avatar = await this.filesService.uploadPublicFile(
    //   img.buffer,
    //   img.originalname,
    // );
    // await this.usersRepository.update(userId, {
    //   ...user,
    //   avatar,
    // });
    // return avatar;
  }

  async deleteAvatar(userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    const user = await this.getById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.update(User, userId, {
          ...user,
          avatar: null,
        });
        await this.filesService.deletePublicFileWithQueryRunner(
          fileId,
          queryRunner,
        );
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.getByEmail(email);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async deleteUserById(userId: number) {
    return this.usersRepository.delete(userId);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async update(id: number, user: UpdateUserDto) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException(
      'User was not found in the database',
      HttpStatus.NOT_FOUND,
    );
  }
}
