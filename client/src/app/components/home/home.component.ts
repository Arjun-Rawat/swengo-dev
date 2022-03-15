import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0.2 }),
        animate(4000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  newPostArrived: boolean = false;
  Title = 'Post Feed';
  form: any;
  processing = false;
  editMode = false;
  POSTS: any = [
    {
      postContext: '',
      id: '',
      tags: [],
      images: [],
      videos: [],
      status: '',
      createdAt: '',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  // lets create a form(note:- reactive form)
  createPostForm() {
    this.form = this.formBuilder.group({
      postContext: ['', Validators.compose([Validators.required])],
    });
  }

  // create post handler
  createPost() {
    // set process to true
    this.processing = true;

    let post = new Object();
    post = {
      postContext: this.form.get('postContext').value,
    };
    // console.log(post);

    setTimeout(() => {
      this.postService.createPost(post).subscribe((data: any) => {
        let temp = {
          postContext: data.postContext,
          id: data.id,
          tags: data.tags,
          images: data.images,
          videos: data.videos,
          status: data.status == 1 ? 'active' : 'inactive',
          createdAt: moment(data.createdAt).format('MMMM Do YYYY, h:mm A'),
        };
        this.newPostArrived = true;
        this.POSTS.unshift(temp);
        // rest the form
        this.form.reset();

        // set the processing to false
        this.processing = false;
      });
    }, 2000);
  }

  getPosts() {
    this.postService.getPosts().subscribe((data: any) => {
      let results = data['results'];
      results.map((x: any) => {
        // x.postContext = x.postContext;
        // x.tags = x.tags;
        // x.images = x.images;
        // x.videos = x.videos;
        x.status = x.status == 1 ? 'active' : 'inactive';

        // x.createdAt = moment(x.createdAt).format('MMMM Do YYYY, h:mm A');
        x.createdAt = moment(x.createdAt).fromNow();

        return x;
      });
      this.POSTS = results;
      // console.log(this.POSTS);
    });
  }

  ngOnInit(): void {
    this.createPostForm();
    this.getPosts();
  }
}
