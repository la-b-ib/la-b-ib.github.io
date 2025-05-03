<?php
// portfolio_app.php - Laravel web application for Labib Bin Shahed's portfolio
// Author: Grok 3 (xAI)
// Date: May 03, 2025
// Description: A complex Laravel app that dynamically renders a portfolio website,
// with user authentication, content versioning, API endpoints, and text input forms,
// replicating the provided HTML with enhanced functionality.

// -----------------------------
// 1. Routes (routes/web.php)
// Define web routes for the application
// -----------------------------

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/about/edit', [AboutController::class, 'edit'])->name('about.edit');
    Route::post('/about/update', [AboutController::class, 'update'])->name('about.update');
    Route::get('/education/edit', [EducationController::class, 'edit'])->name('education.edit');
    Route::post('/education/update', [EducationController::class, 'update'])->name('education.update');
});

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// API Routes
Route::prefix('api')->group(function () {
    Route::get('/profile', [PortfolioController::class, 'getProfile']);
    Route::get('/about', [PortfolioController::class, 'getAbout']);
    Route::get('/education', [PortfolioController::class, 'getEducation']);
});

// -----------------------------
// 2. Routes (routes/api.php)
// Define API routes for programmatic access
// -----------------------------

use App\Http\Controllers\Api\PortfolioApiController;

Route::prefix('v1')->group(function () {
    Route::get('/profile', [PortfolioApiController::class, 'getProfile']);
    Route::get('/about', [PortfolioApiController::class, 'getAbout']);
    Route::get('/education', [PortfolioApiController::class, 'getEducation']);
    Route::get('/experiences', [PortfolioApiController::class, 'getExperiences']);
    Route::get('/projects', [PortfolioApiController::class, 'getProjects']);
    Route::get('/skills', [PortfolioApiController::class, 'getSkills']);
});

// -----------------------------
// 3. Models
// Eloquent models for portfolio sections
// -----------------------------

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model {
    use HasFactory;
    protected $fillable = ['name', 'title', 'profile_picture_url'];
}

class About extends Model {
    use HasFactory;
    protected $fillable = ['description', 'birthday', 'phone', 'hometown', 'email'];
}

class Education extends Model {
    use HasFactory;
    protected $fillable = ['institution', 'degree', 'period', 'coursework'];
}

class Certification extends Model {
    use HasFactory;
    protected $fillable = ['name', 'url', 'badge_url'];
}

class ResearchPublication extends Model {
    use HasFactory;
    protected $fillable = ['title', 'doi', 'published_in', 'location', 'isbn', 'issn', 'date'];
}

class Experience extends Model {
    use HasFactory;
    protected $fillable = ['organization', 'role', 'period', 'responsibilities'];
}

class Project extends Model {
    use HasFactory;
    protected $fillable = ['name', 'type', 'image_url', 'details_url'];
}

class SkillCategory extends Model {
    use HasFactory;
    protected $fillable = ['name'];
    public function skills(): HasMany {
        return $this->hasMany(Skill::class);
    }
}

class Skill extends Model {
    use HasFactory;
    protected $fillable = ['name', 'logo_url', 'skill_category_id'];
}

class Contact extends Model {
    use HasFactory;
    protected $fillable = ['address', 'email1', 'email2', 'phone'];
}

class ContentVersion extends Model {
    use HasFactory;
    protected $fillable = ['model_type', 'model_id', 'data', 'user_id', 'version_number'];
}

// -----------------------------
// 4. Controllers (app/Http/Controllers/PortfolioController.php)
// Main controller for rendering the portfolio
// -----------------------------

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\About;
use App\Models\Education;
use App\Models\Certification;
use App\Models\ResearchPublication;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\Contact;
use Illuminate\Http\Request;

class PortfolioController extends Controller {
    public function index(Request $request) {
        $profile = Profile::first();
        $about = About::first();
        $education = Education::first();
        $certifications = Certification::all();
        $researchPublications = ResearchPublication::all();
        $experiences = Experience::all();
        $projects = Project::all();
        $skillCategories = SkillCategory::with('skills')->get();
        $contact = Contact::first();

        return view('portfolio.index', compact(
            'profile', 'about', 'education', 'certifications',
            'researchPublications', 'experiences', 'projects',
            'skillCategories', 'contact'
        ));
    }

    public function getProfile() {
        return response()->json(Profile::first());
    }

    public function getAbout() {
        return response()->json(About::first());
    }

    public function getEducation() {
        return response()->json(Education::all());
    }
}

// -----------------------------
// 5. Controllers (app/Http/Controllers/ProfileController.php)
// Controller for profile updates
// -----------------------------

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ContentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {
    public function edit() {
        $profile = Profile::first();
        return view('portfolio.profile_edit', compact('profile'));
    }

    public function update(Request $request) {
        $request->validate([
            'name' => 'required|string|max:100',
            'title' => 'required|string|max:200',
        ]);

        $profile = Profile::first();
        $oldData = $profile->toArray();

        $profile->update([
            'name' => $request->name,
            'title' => $request->title,
        ]);

        // Save version
        ContentVersion::create([
            'model_type' => Profile::class,
            'model_id' => $profile->id,
            'data' => json_encode($oldData),
            'user_id' => Auth::id(),
            'version_number' => ContentVersion::where('model_type', Profile::class)->count() + 1,
        ]);

        return redirect()->route('home')->with('success', 'Profile updated successfully');
    }
}

// -----------------------------
// 6. Controllers (app/Http/Controllers/AboutController.php)
// Controller for about section updates
// -----------------------------

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\ContentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AboutController extends Controller {
    public function edit() {
        $about = About::first();
        return view('portfolio.about_edit', compact('about'));
    }

    public function update(Request $request) {
        $request->validate([
            'description' => 'required|string',
            'birthday' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'hometown' => 'required|string|max:100',
            'email' => 'required|email|max:100',
        ]);

        $about = About::first();
        $oldData = $about->toArray();

        $about->update([
            'description' => $request->description,
            'birthday' => $request->birthday,
            'phone' => $request->phone,
            'hometown' => $request->hometown,
            'email' => $request->email,
        ]);

        // Save version
        ContentVersion::create([
            'model_type' => About::class,
            'model_id' => $about->id,
            'data' => json_encode($oldData),
            'user_id' => Auth::id(),
            'version_number' => ContentVersion::where('model_type', About::class)->count() + 1,
        ]);

        return redirect()->route('home')->with('success', 'About section updated successfully');
    }
}

// -----------------------------
// 7. Controllers (app/Http/Controllers/EducationController.php)
// Controller for education section updates
// -----------------------------

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\ContentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationController extends Controller {
    public function edit() {
        $education = Education::first();
        return view('portfolio.education_edit', compact('education'));
    }

    public function update(Request $request) {
        $request->validate([
            'institution' => 'required|string|max:100',
            'degree' => 'required|string|max:100',
            'period' => 'required|string|max:50',
            'coursework' => 'required|string',
        ]);

        $education = Education::first();
        $oldData = $education->toArray();

        $education->update([
            'institution' => $request->institution,
            'degree' => $request->degree,
            'period' => $request->period,
            'coursework' => $request->coursework,
        ]);

        // Save version
        ContentVersion::create([
            'model_type' => Education::class,
            'model_id' => $education->id,
            'data' => json_encode($oldData),
            'user_id' => Auth::id(),
            'version_number' => ContentVersion::where('model_type', Education::class)->count() + 1,
        ]);

        return redirect()->route('home')->with('success', 'Education section updated successfully');
    }
}

// -----------------------------
// 8. API Controller (app/Http/Controllers/Api/PortfolioApiController.php)
// Controller for API endpoints
// -----------------------------

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\About;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillCategory;

class PortfolioApiController extends Controller {
    public function getProfile() {
        return response()->json(Profile::first());
    }

    public function getAbout() {
        return response()->json(About::first());
    }

    public function getEducation() {
        return response()->json(Education::all());
    }

    public function getExperiences() {
        return response()->json(Experience::all());
    }

    public function getProjects() {
        return response()->json(Project::all());
    }

    public function getSkills() {
        return response()->json(SkillCategory::with('skills')->get());
    }
}

// -----------------------------
// 9. Auth Controller (app/Http/Controllers/AuthController.php)
// Controller for authentication
// -----------------------------

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    public function showLoginForm() {
        return view('auth.login');
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('home');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('login');
    }
}

// -----------------------------
// 10. Database Migration (database/migrations/2025_05_03_create_portfolio_tables.php)
// Migration for portfolio tables
// -----------------------------

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortfolioTables extends Migration {
    public function up() {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('title', 200);
            $table->string('profile_picture_url', 200);
            $table->timestamps();
        });

        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->string('birthday', 50);
            $table->string('phone', 20);
            $table->string('hometown', 100);
            $table->string('email', 100);
            $table->timestamps();
        });

        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('institution', 100);
            $table->string('degree', 100);
            $table->string('period', 50);
            $table->text('coursework');
            $table->timestamps();
        });

        Schema::create('content_versions', function (Blueprint $table) {
            $table->id();
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');
            $table->json('data');
            $table->unsignedBigInteger('user_id');
            $table->integer('version_number');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('abouts');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('content_versions');
    }
}

// -----------------------------
// 11. Database Seeder (database/seeders/DatabaseSeeder.php)
// Seed initial portfolio data
// -----------------------------

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\About;
use App\Models\Education;

class DatabaseSeeder extends Seeder {
    public function run() {
        Profile::create([
            'name' => 'Labib Bin Shahed',
            'title' => 'CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher | IEEE CSBDC Secretariat President 2025 | Open Source Contributor',
            'profile_picture_url' => 'assets/img/profile.jpeg',
        ]);

        About::create([
            'description' => 'Focused and enthusiastic developer with a keen interest in software development and artificial intelligence...',
            'birthday' => '18th January 2003',
            'phone' => '+1 480-400-800',
            'hometown' => 'Jessore, Bangladesh',
            'email' => 'labib.45x@gmail.com',
        ]);

        Education::create([
            'institution' => 'BRAC University',
            'degree' => 'B.Sc in Computer Science and Engineering',
            'period' => 'January 2022 - Present',
            'coursework' => 'Cloud Computing, ML & DL, Database Management Systems, Algorithms & Optimization',
        ]);

        // Add more seeders for other models
    }
}

// -----------------------------
// 12. Main Blade Template (resources/views/portfolio/index.blade.php)
// Main portfolio page
// -----------------------------

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>AURIX</title>
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/icofont/icofont.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/remixicon/remixicon.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/owl.carousel/assets/owl.carousel.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/venobox/venobox.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    <header id="header" class="header-tops">
        <div class="container">
            <h1><a href="#">{{ $profile->name }}</a></h1>
            <h2 style="color:#fff">I'm <span class="typing" style="color:#12D640"></span></h2>
            <nav class="nav-menu d-none d-lg-block">
                <ul>
                    <li class="active"><a href="#header"><span><b>Home</b></span></a></li>
                    <li><a href="#about"><span><b>About</b></span></a></li>
                    <li><a href="#education"><span><b>Education</b></span></a></li>
                    <li><a href="#experience"><span><b>Experience</b></span></a></li>
                    <li><a href="#portfolio"><span><b>Projects</b></span></a></li>
                    <li><a href="#skills"><span><b>Skills</b></span></a></li>
                    <li><a href="#resume"><span><b>Resume</b></span></a></li>
                    <li><a href="#contacts"><span><b>Contact</b></span></a></li>
                </ul>
            </nav>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/la-b-ib/" target="_blank" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                <a href="https://github.com/la-b-ib" target="_blank" class="github"><i class="bx bxl-github"></i></a>
                <a href="mailto:labib.45x@gmail.com" target="_blank" class="google"><i class="bx bxl-google"></i></a>
            </div>
            @auth
                <div>
                    <a href="{{ route('profile.edit') }}" class="btn btn-primary">Edit Profile</a>
                    <a href="{{ route('about.edit') }}" class="btn btn-primary">Edit About</a>
                    <a href="{{ route('education.edit') }}" class="btn btn-primary">Edit Education</a>
                    <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                        @csrf
                        <button type="submit" class="btn btn-danger">Logout</button>
                    </form>
                </div>
            @else
                <a href="{{ route('login') }}" class="btn btn-primary">Login</a>
            @endauth
        </div>
    </header>
    <section id="about" class="about">
        <div class="about-me container">
            <div class="section-title">
                <h2><b>About</b></h2>
            </div>
            <div class="row">
                <div class="col-lg-4" data-aos="fade-right">
                    <img src="{{ asset($profile->profile_picture_url) }}" class="img-fluid" alt="">
                </div>
                <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                    <p>{!! nl2br(e($about->description)) !!}</p>
                    <div class="row">
                        <div class="col-lg-6">
                            <ul>
                                <li><i class="icofont-rounded-right"></i> <strong>Birthday:</strong> {{ $about->birthday }}</li>
                                <li><i class="icofont-rounded-right"></i> <strong>Phone:</strong> {{ $about->phone }}</li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <ul>
                                <li><i class="icofont-rounded-right"></i> <strong>Home Town:</strong> {{ $about->hometown }}</li>
                                <li><i class="icofont-rounded-right"></i> <strong>Email:</strong> <a href="mailto:{{ $about->email }}">{{ $about->email }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Add other sections dynamically -->
    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('vendor/typed.js/typed.min.js') }}"></script>
    <script>
        var typed = new Typed('.typing', {
            strings: ["<b>Coder</b>", "<b>Developer</b>", "<b>AI Enthusiast</b>", "<b>Researcher</b>"],
            loop: true,
            typeSpeed: 65,
            backSpeed: 65
        });
    </script>
    <script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
*/

// -----------------------------
// 13. Profile Edit Template (resources/views/portfolio/profile_edit.blade.php)
// -----------------------------

/*
@extends('layouts.app')
@section('content')
<div class="container">
    <h2>Edit Profile</h2>
    <form method="POST" action="{{ route('profile.update') }}">
        @csrf
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $profile->name) }}" required>
            @error('name')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="title">Title</label>
            <textarea name="title" class="form-control @error('title') is-invalid @enderror" required>{{ old('title', $profile->title) }}</textarea>
            @error('title')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('home') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
*/

// -----------------------------
// 14. About Edit Template (resources/views/portfolio/about_edit.blade.php)
// -----------------------------

/*
@extends('layouts.app')
@section('content')
<div class="container">
    <h2>Edit About</h2>
    <form method="POST" action="{{ route('about.update') }}">
        @csrf
        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" class="form-control @error('description') is-invalid @enderror" required>{{ old('description', $about->description) }}</textarea>
            @error('description')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="birthday">Birthday</label>
            <input type="text" name="birthday" class="form-control @error('birthday') is-invalid @enderror" value="{{ old('birthday', $about->birthday) }}" required>
            @error('birthday')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" name="phone" class="form-control @error('phone') is-invalid @enderror" value="{{ old('phone', $about->phone) }}" required>
            @error('phone')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="hometown">Hometown</label>
            <input type="text" name="hometown" class="form-control @error('hometown') is-invalid @enderror" value="{{ old('hometown', $about->hometown) }}" required>
            @error('hometown')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email', $about->email) }}" required>
            @error('email')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('home') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
*/

// -----------------------------
// 15. Education Edit Template (resources/views/portfolio/education_edit.blade.php)
// -----------------------------

/*
@extends('layouts.app')
@section('content')
<div class="container">
    <h2>Edit Education</h2>
    <form method="POST" action="{{ route('education.update') }}">
        @csrf
        <div class="form-group">
            <label for="institution">Institution</label>
            <input type="text" name="institution" class="form-control @error('institution') is-invalid @enderror" value="{{ old('institution', $education->institution) }}" required>
            @error('institution')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="degree">Degree</label>
            <input type="text" name="degree" class="form-control @error('degree') is-invalid @enderror" value="{{ old('degree', $education->degree) }}" required>
            @error('degree')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="period">Period</label>
            <input type="text" name="period" class="form-control @error('period') is-invalid @enderror" value="{{ old('period', $education->period) }}" required>
            @error('period')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="coursework">Coursework</label>
            <textarea name="coursework" class="form-control @error('coursework') is-invalid @enderror" required>{{ old('coursework', $education->coursework) }}</textarea>
            @error('coursework')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('home') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
*/

// -----------------------------
// 16. Login Template (resources/views/auth/login.blade.php)
// -----------------------------

/*
@extends('layouts.app')
@section('content')
<div class="container">
    <h2>Login</h2>
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}" required>
            @error('email')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" class="form-control @error('password') is-invalid @enderror" required>
            @error('password')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</div>
@endsection
*/

// -----------------------------
// 17. Layout Template (resources/views/layouts/app.blade.php)
// -----------------------------

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'AURIX')</title>
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @yield('content')
</body>
</html>
*/

// -----------------------------
// 18. Configuration (config/app.php excerpt)
// -----------------------------

/*
'timezone' => 'UTC',
'locale' => 'en',
'fallback_locale' => 'en',
'faker_locale' => 'en_US',
*/

// -----------------------------
// 19. Middleware (app/Http/Middleware/RoleMiddleware.php)
// Custom middleware for role-based access
// -----------------------------

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware {
    public function handle(Request $request, Closure $next, $role) {
        if (!Auth::check() || Auth::user()->role !== $role) {
            return redirect('login')->with('error', 'Unauthorized access');
        }
        return $next($request);
    }
}

// -----------------------------
// 20. User Model Extension (app/Models/User.php)
// Extend User model for roles
// -----------------------------

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
    protected $fillable = ['name', 'email', 'password', 'role'];
    protected $hidden = ['password', 'remember_token'];
}

// -----------------------------
// 21. Bootstrap File (bootstrap/app.php excerpt)
// -----------------------------

/*
$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

return $app;
*/

?>