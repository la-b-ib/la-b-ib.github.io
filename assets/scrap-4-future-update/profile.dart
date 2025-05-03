// portfolio_app.dart - Flutter/Dart web application for Labib Bin Shahed's portfolio
// Author: Grok 3 (xAI)
// Date: May 03, 2025
// Description: A Flutter web app that dynamically renders a portfolio website,
// allowing users to update text content via input forms, replicating the provided HTML
// with responsive design and state management.

// -----------------------------
// 1. Imports
// Required packages and dependencies
// -----------------------------

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:universal_html/html.dart' as html;

// -----------------------------
// 2. Main Entry (main.dart)
// Application entry point
// -----------------------------

void main() {
  setUrlStrategy(PathUrlStrategy());
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => PortfolioProvider()),
      ],
      child: MaterialApp(
        title: 'AURIX',
        theme: ThemeData(
          primaryColor: Color(0xFF12D640),
          scaffoldBackgroundColor: Color(0xFF1A252F),
          textTheme: TextTheme(
            headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
            headlineMedium: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
            bodyLarge: TextStyle(fontSize: 16, color: Colors.white),
            bodyMedium: TextStyle(fontSize: 14, color: Colors.white70),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFF12D640),
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
          ),
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: Color(0xFF2A3B4A),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            labelStyle: TextStyle(color: Colors.white70),
          ),
        ),
        home: PortfolioScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

// -----------------------------
// 3. Models
// Data models for portfolio sections
// -----------------------------

class Profile {
  String name;
  String title;
  String profilePictureUrl;

  Profile({
    required this.name,
    required this.title,
    required this.profilePictureUrl,
  });

  Map<String, dynamic> toJson() => {
        'name': name,
        'title': title,
        'profilePictureUrl': profilePictureUrl,
      };

  factory Profile.fromJson(Map<String, dynamic> json) => Profile(
        name: json['name'],
        title: json['title'],
        profilePictureUrl: json['profilePictureUrl'],
      );
}

class About {
  String description;
  String birthday;
  String phone;
  String hometown;
  String email;

  About({
    required this.description,
    required this.birthday,
    required this.phone,
    required this.hometown,
    required this.email,
  });

  Map<String, dynamic> toJson() => {
        'description': description,
        'birthday': birthday,
        'phone': phone,
        'hometown': hometown,
        'email': email,
      };

  factory About.fromJson(Map<String, dynamic> json) => About(
        description: json['description'],
        birthday: json['birthday'],
        phone: json['phone'],
        hometown: json['hometown'],
        email: json['email'],
      );
}

class Education {
  String institution;
  String degree;
  String period;
  List<String> coursework;

  Education({
    required this.institution,
    required this.degree,
    required this.period,
    required this.coursework,
  });

  Map<String, dynamic> toJson() => {
        'institution': institution,
        'degree': degree,
        'period': period,
        'coursework': coursework,
      };

  factory Education.fromJson(Map<String, dynamic> json) => Education(
        institution: json['institution'],
        degree: json['degree'],
        period: json['period'],
        coursework: List<String>.from(json['coursework']),
      );
}

class Certification {
  String name;
  String url;
  String badgeUrl;

  Certification({
    required this.name,
    required this.url,
    required this.badgeUrl,
  });
}

class ResearchPublication {
  String title;
  String doi;
  String publishedIn;
  String location;
  String? isbn;
  String? issn;
  String date;

  ResearchPublication({
    required this.title,
    required this.doi,
    required this.publishedIn,
    required this.location,
    this.isbn,
    this.issn,
    required this.date,
  });
}

class Experience {
  String organization;
  String role;
  String period;
  List<String> responsibilities;

  Experience({
    required this.organization,
    required this.role,
    required this.period,
    required this.responsibilities,
  });
}

class Project {
  String name;
  String type;
  String imageUrl;
  String detailsUrl;

  Project({
    required this.name,
    required this.type,
    required this.imageUrl,
    required this.detailsUrl,
  });
}

class Skill {
  String name;
  String logoUrl;

  Skill({
    required this.name,
    required this.logoUrl,
  });
}

class SkillCategory {
  String name;
  List<Skill> skills;

  SkillCategory({
    required this.name,
    required this.skills,
  });
}

class Contact {
  String address;
  String email1;
  String email2;
  String phone;

  Contact({
    required this.address,
    required this.email1,
    required this.email2,
    required this.phone,
  });
}

class SocialLink {
  String platform;
  String url;
  IconData icon;

  SocialLink({
    required this.platform,
    required this.url,
    required this.icon,
  });
}

// -----------------------------
// 4. Provider (portfolio_provider.dart)
// State management for portfolio data
// -----------------------------

class PortfolioProvider with ChangeNotifier {
  Profile _profile = Profile(
    name: 'Labib Bin Shahed',
    title: 'CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher | IEEE CSBDC Secretariat President 2025 | Open Source Contributor',
    profilePictureUrl: 'assets/img/profile.jpeg',
  );

  About _about = About(
    description: 'Focused and enthusiastic developer with a keen interest in software development and artificial intelligence...',
    birthday: '18th January 2003',
    phone: '+1 480-400-800',
    hometown: 'Jessore, Bangladesh',
    email: 'labib.45x@gmail.com',
  );

  Education _education = Education(
    institution: 'BRAC University',
    degree: 'B.Sc in Computer Science and Engineering',
    period: 'January 2022 - Present',
    coursework: [
      'Cloud Computing, ML & DL',
      'Database Management Systems',
      'Algorithms & Optimization',
    ],
  );

  Profile get profile => _profile;
  About get about => _about;
  Education get education => _education;

  Future<void> loadData() async {
    final prefs = await SharedPreferences.getInstance();
    final profileJson = prefs.getString('profile');
    final aboutJson = prefs.getString('about');
    final educationJson = prefs.getString('education');

    if (profileJson != null) {
      _profile = Profile.fromJson(jsonDecode(profileJson));
    }
    if (aboutJson != null) {
      _about = About.fromJson(jsonDecode(aboutJson));
    }
    if (educationJson != null) {
      _education = Education.fromJson(jsonDecode(educationJson));
    }

    notifyListeners();
  }

  Future<void> updateProfile(Profile newProfile) async {
    _profile = newProfile;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('profile', jsonEncode(newProfile.toJson()));
    notifyListeners();
  }

  Future<void> updateAbout(About newAbout) async {
    _about = newAbout;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('about', jsonEncode(newAbout.toJson()));
    notifyListeners();
  }

  Future<void> updateEducation(Education newEducation) async {
    _education = newEducation;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('education', jsonEncode(newEducation.toJson()));
    notifyListeners();
  }
}

// -----------------------------
// 5. Portfolio Screen (portfolio_screen.dart)
// Main screen with scrollable sections
// -----------------------------

class PortfolioScreen extends StatefulWidget {
  @override
  _PortfolioScreenState createState() => _PortfolioScreenState();
}

class _PortfolioScreenState extends State<PortfolioScreen> {
  final ItemScrollController _scrollController = ItemScrollController();
  final List<String> _sectionIds = [
    'header',
    'about',
    'education',
    'experience',
    'portfolio',
    'skills',
    'resume',
    'contacts',
  ];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<PortfolioProvider>(context, listen: false).loadData();
    });
  }

  void _scrollToSection(int index) {
    _scrollController.scrollTo(
      index: index,
      duration: Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ScrollablePositionedList.builder(
        itemScrollController: _scrollController,
        itemCount: _sectionIds.length,
        itemBuilder: (context, index) {
          switch (_sectionIds[index]) {
            case 'header':
              return HeaderSection(onNavTap: _scrollToSection);
            case 'about':
              return AboutSection();
            case 'education':
              return EducationSection();
            case 'experience':
              return ExperienceSection();
            case 'portfolio':
              return ProjectsSection();
            case 'skills':
              return SkillsSection();
            case 'resume':
              return ResumeSection();
            case 'contacts':
              return ContactSection();
            default:
              return Container();
          }
        },
      ),
    );
  }
}

// -----------------------------
// 6. Header Section (header_section.dart)
// Header with navigation and profile edit form
// -----------------------------

class HeaderSection extends StatefulWidget {
  final Function(int) onNavTap;

  HeaderSection({required this.onNavTap});

  @override
  _HeaderSectionState createState() => _HeaderSectionState();
}

class _HeaderSectionState extends State<HeaderSection> {
  bool _isEditing = false;

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);
    final profile = provider.profile;

    return Container(
      padding: EdgeInsets.symmetric(vertical: 40, horizontal: 16),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 10)],
      ),
      child: Column(
        children: [
          Text(
            profile.name,
            style: Theme.of(context).textTheme.headlineLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 16),
          TypingAnimation(),
          SizedBox(height: 24),
          NavigationBar(onNavTap: widget.onNavTap),
          SizedBox(height: 16),
          SocialLinks(),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () => setState(() => _isEditing = !_isEditing),
            child: Text(_isEditing ? 'Cancel' : 'Edit Profile'),
          ),
          if (_isEditing) ProfileEditForm(),
        ],
      ),
    );
  }
}

// -----------------------------
// 7. Typing Animation (typing_animation.dart)
// Custom widget for typing effect
// -----------------------------

class TypingAnimation extends StatefulWidget {
  @override
  _TypingAnimationState createState() => _TypingAnimationState();
}

class _TypingAnimationState extends State<TypingAnimation> with SingleTickerProviderStateMixin {
  final List<String> _strings = ['Coder', 'Developer', 'AI Enthusiast', 'Researcher'];
  int _currentIndex = 0;
  String _currentText = '';
  bool _isTyping = true;
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 100),
    )..addListener(() {
        setState(() {
          if (_isTyping) {
            if (_currentText.length < _strings[_currentIndex].length) {
              _currentText = _strings[_currentIndex].substring(0, _currentText.length + 1);
            } else {
              _isTyping = false;
              _controller.stop();
              Future.delayed(Duration(seconds: 1), _reverse);
            }
          } else {
            if (_currentText.isNotEmpty) {
              _currentText = _currentText.substring(0, _currentText.length - 1);
            } else {
              _isTyping = true;
              _currentIndex = (_currentIndex + 1) % _strings.length;
              _controller.stop();
              Future.delayed(Duration(milliseconds: 500), _forward);
            }
          }
        });
      });
    _forward();
  }

  void _forward() {
    _controller.repeat();
  }

  void _reverse() {
    _controller.repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        children: [
          TextSpan(text: "I'm ", style: Theme.of(context).textTheme.headlineMedium),
          TextSpan(
            text: _currentText,
            style: Theme.of(context).textTheme.headlineMedium!.copyWith(color: Color(0xFF12D640)),
          ),
        ],
      ),
    );
  }
}

// -----------------------------
// 8. Navigation Bar (navigation_bar.dart)
// Navigation widget
// -----------------------------

class NavigationBar extends StatelessWidget {
  final Function(int) onNavTap;

  NavigationBar({required this.onNavTap});

  final List<Map<String, dynamic>> _navItems = [
    {'name': 'Home', 'index': 0},
    {'name': 'About', 'index': 1},
    {'name': 'Education', 'index': 2},
    {'name': 'Experience', 'index': 3},
    {'name': 'Projects', 'index': 4},
    {'name': 'Skills', 'index': 5},
    {'name': 'Resume', 'index': 6},
    {'name': 'Contact', 'index': 7},
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 768) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: _navItems
                .asMap()
                .entries
                .map((entry) => Padding(
                      padding: EdgeInsets.symmetric(horizontal: 12),
                      child: InkWell(
                        onTap: () => onNavTap(entry.value['index']),
                        child: Text(
                          entry.value['name'],
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ))
                .toList(),
          );
        } else {
          return IconButton(
            icon: Icon(Icons.menu, color: Colors.white),
            onPressed: () {
              showModalBottomSheet(
                context: context,
                builder: (context) => Column(
                  mainAxisSize: MainAxisSize.min,
                  children: _navItems
                      .asMap()
                      .entries
                      .map((entry) => ListTile(
                            title: Text(entry.value['name']),
                            onTap: () {
                              onNavTap(entry.value['index']);
                              Navigator.pop(context);
                            },
                          ))
                      .toList(),
                ),
              );
            },
          );
        }
      },
    );
  }
}

// -----------------------------
// 9. Social Links (social_links.dart)
// Social media links widget
// -----------------------------

class SocialLinks extends StatelessWidget {
  final List<SocialLink> _links = [
    SocialLink(platform: 'LinkedIn', url: 'https://www.linkedin.com/in/la-b-ib/', icon: Icons.link),
    SocialLink(platform: 'GitHub', url: 'https://github.com/la-b-ib', icon: Icons.code),
    SocialLink(platform: 'Google', url: 'mailto:labib.45x@gmail.com', icon: Icons.email),
  ];

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: _links
          .map((link) => Padding(
                padding: EdgeInsets.symmetric(horizontal: 12),
                child: IconButton(
                  icon: Icon(link.icon, color: Colors.white, size: 30),
                  onPressed: () {
                    html.window.open(link.url, '_blank');
                  },
                ),
              ))
          .toList(),
    );
  }
}

// -----------------------------
// 10. Profile Edit Form (profile_edit_form.dart)
// Form for editing profile
// -----------------------------

class ProfileEditForm extends StatefulWidget {
  @override
  _ProfileEditFormState createState() => _ProfileEditFormState();
}

class _ProfileEditFormState extends State<ProfileEditForm> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _titleController;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<PortfolioProvider>(context, listen: false);
    _nameController = TextEditingController(text: provider.profile.name);
    _titleController = TextEditingController(text: provider.profile.title);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _titleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context, listen: false);

    return Padding(
      padding: EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
              validator: (value) => value!.isEmpty ? 'Required' : null,
            ),
            SizedBox(height: 16),
            TextFormField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Title'),
              maxLines: 3,
              validator: (value) => value!.isEmpty ? 'Required' : null,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  provider.updateProfile(Profile(
                    name: _nameController.text,
                    title: _titleController.text,
                    profilePictureUrl: provider.profile.profilePictureUrl,
                  ));
                }
              },
              child: Text('Save'),
            ),
          ],
        ),
      ),
    );
  }
}

// -----------------------------
// 11. About Section (about_section.dart)
// About section with edit form
// -----------------------------

class AboutSection extends StatefulWidget {
  @override
  _AboutSectionState createState() => _AboutSectionState();
}

class _AboutSectionState extends State<AboutSection> {
  bool _isEditing = false;

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);
    final about = provider.about;

    return Container(
      padding: EdgeInsets.all(40),
      child: Column(
        children: [
          Text('About', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          LayoutBuilder(
            builder: (context, constraints) {
              final isWide = constraints.maxWidth > 768;
              return Flex(
                direction: isWide ? Axis.horizontal : Axis.vertical,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (isWide)
                    Flexible(
                      flex: 1,
                      child: Image.asset(
                        provider.profile.profilePictureUrl,
                        height: 300,
                        fit: BoxFit.cover,
                      ),
                    ),
                  Flexible(
                    flex: 2,
                    child: Padding(
                      padding: EdgeInsets.all(isWide ? 16 : 0),
                      child: _isEditing ? AboutEditForm() : AboutContent(about: about),
                    ),
                  ),
                ],
              );
            },
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () => setState(() => _isEditing = !_isEditing),
            child: Text(_isEditing ? 'Cancel' : 'Edit About'),
          ),
          SizedBox(height: 24),
          ResearchPublications(),
        ],
      ),
    );
  }
}

// -----------------------------
// 12. About Content (about_content.dart)
// Content display for about section
// -----------------------------

class AboutContent extends StatelessWidget {
  final About about;

  AboutContent({required this.about});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(about.description, style: Theme.of(context).textTheme.bodyLarge),
        SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, constraints) {
            final isWide = constraints.maxWidth > 768;
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Birthday: ${about.birthday}', style: Theme.of(context).textTheme.bodyMedium),
                      Text('Phone: ${about.phone}', style: Theme.of(context).textTheme.bodyMedium),
                    ],
                  ),
                ),
                if (isWide) SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Hometown: ${about.hometown}', style: Theme.of(context).textTheme.bodyMedium),
                      Text('Email: ${about.email}', style: Theme.of(context).textTheme.bodyMedium),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ],
    );
  }
}

// -----------------------------
// 13. About Edit Form (about_edit_form.dart)
// Form for editing about section
// -----------------------------

class AboutEditForm extends StatefulWidget {
  @override
  _AboutEditFormState createState() => _AboutEditFormState();
}

class _AboutEditFormState extends State<AboutEditForm> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _descriptionController;
  late TextEditingController _birthdayController;
  late TextEditingController _phoneController;
  late TextEditingController _hometownController;
  late TextEditingController _emailController;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<PortfolioProvider>(context, listen: false);
    _descriptionController = TextEditingController(text: provider.about.description);
    _birthdayController = TextEditingController(text: provider.about.birthday);
    _phoneController = TextEditingController(text: provider.about.phone);
    _hometownController = TextEditingController(text: provider.about.hometown);
    _emailController = TextEditingController(text: provider.about.email);
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    _birthdayController.dispose();
    _phoneController.dispose();
    _hometownController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context, listen: false);

    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _descriptionController,
            decoration: InputDecoration(labelText: 'Description'),
            maxLines: 5,
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _birthdayController,
            decoration: InputDecoration(labelText: 'Birthday'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _phoneController,
            decoration: InputDecoration(labelText: 'Phone'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _hometownController,
            decoration: InputDecoration(labelText: 'Hometown'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(labelText: 'Email'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                provider.updateAbout(About(
                  description: _descriptionController.text,
                  birthday: _birthdayController.text,
                  phone: _phoneController.text,
                  hometown: _hometownController.text,
                  email: _emailController.text,
                ));
              }
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }
}

// -----------------------------
// 14. Research Publications (research_publications.dart)
// Research publications display
// -----------------------------

class ResearchPublications extends StatelessWidget {
  final List<ResearchPublication> _publications = [
    ResearchPublication(
      title: 'Blockchain in Project Management for Information Security, Transparency and Accountability',
      doi: '10.1109/ICEIC64972.2025.10879668',
      publishedIn: '2025 International Conference on Electronics, Information, and Communication (ICEIC)',
      location: 'Osaka, Japan',
      isbn: '979-8-3315-1075-6',
      issn: '2767-7699',
      date: '19-22 January 2025',
    ),
    // Add more publications
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Research Contributions', style: Theme.of(context).textTheme.headlineMedium),
        SizedBox(height: 16),
        ..._publications.map((pub) => Padding(
              padding: EdgeInsets.only(bottom: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Title: ${pub.title}',
                    style: Theme.of(context).textTheme.bodyLarge!.copyWith(color: Color(0xFF12D640)),
                  ),
                  SizedBox(height: 8),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('DOI: ${pub.doi}'),
                            Text('Published in: ${pub.publishedIn}'),
                          ],
                        ),
                      ),
                      SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Location: ${pub.location}'),
                            Text('Date: ${pub.date}'),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )),
      ],
     );
  }
}

// -----------------------------
// 15. Education Section (education_section.dart)
// Education section with edit form
// -----------------------------

class EducationSection extends StatefulWidget {
  @override
  _EducationSectionState createState() => _EducationSectionState();
}

class _EducationSectionState extends State<EducationSection> {
  bool _isEditing = false;

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);
    final education = provider.education;

    return Container(
      padding: EdgeInsets.all(40),
      color: Color(0xFF2A3B4A),
      child: Column(
        children: [
          Text('Education', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          if (!_isEditing) ...[
            Image.asset('assets/img/education/bu.png', height: 100),
            SizedBox(height: 16),
            Text(education.degree, style: Theme.of(context).textTheme.headlineMedium),
            Text(education.institution, style: Theme.of(context).textTheme.bodyLarge),
            Text(education.period, style: Theme.of(context).textTheme.bodyMedium),
            SizedBox(height: 16),
            Text('Relevant Coursework', style: Theme.of(context).textTheme.bodyLarge),
            ...education.coursework.map((course) => Padding(
                  padding: EdgeInsets.symmetric(vertical: 4),
                  child: Text('• $course', style: Theme.of(context).textTheme.bodyMedium),
                )),
          ],
          if (_isEditing) EducationEditForm(),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () => setState(() => _isEditing = !_isEditing),
            child: Text(_isEditing ? 'Cancel' : 'Edit Education'),
          ),
          SizedBox(height: 24),
          Certifications(),
        ],
      ),
    );
  }
}

// -----------------------------
// 16. Education Edit Form (education_edit_form.dart)
// Form for editing education
// -----------------------------

class EducationEditForm extends StatefulWidget {
  @override
  _EducationEditFormState createState() => _EducationEditFormState();
}

class _EducationEditFormState extends State<EducationEditForm> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _institutionController;
  late TextEditingController _degreeController;
  late TextEditingController _periodController;
  late TextEditingController _courseworkController;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<PortfolioProvider>(context, listen: false);
    _institutionController = TextEditingController(text: provider.education.institution);
    _degreeController = TextEditingController(text: provider.education.degree);
    _periodController = TextEditingController(text: provider.education.period);
    _courseworkController = TextEditingController(text: provider.education.coursework.join('\n'));
  }

  @override
  void dispose() {
    _institutionController.dispose();
    _degreeController.dispose();
    _periodController.dispose();
    _courseworkController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context, listen: false);

    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _institutionController,
            decoration: InputDecoration(labelText: 'Institution'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _degreeController,
            decoration: InputDecoration(labelText: 'Degree'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _periodController,
            decoration: InputDecoration(labelText: 'Period'),
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _courseworkController,
            decoration: InputDecoration(labelText: 'Coursework (one per line)'),
            maxLines: 5,
            validator: (value) => value!.isEmpty ? 'Required' : null,
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                provider.updateEducation(Education(
                  institution: _institutionController.text,
                  degree: _degreeController.text,
                  period: _periodController.text,
                  coursework: _courseworkController.text.split('\n').where((line) => line.trim().isNotEmpty).toList(),
                ));
              }
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }
}

// -----------------------------
// 17. Certifications (certifications.dart)
// Certifications display
// -----------------------------

class Certifications extends StatelessWidget {
  final List<Certification> _certifications = [
    Certification(
      name: 'Programmable Messaging and Voice',
      url: 'https://www.linkedin.com/learning/certificates/759119dcc46bdb4e63fb82dc49ed0ad4288a97d9031dd360fdb0686f65b0b398',
      badgeUrl: 'assets/img/certification/tw.jpg',
    ),
    // Add more certifications
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Certifications', style: Theme.of(context).textTheme.headlineMedium),
        SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, constraints) {
            final crossAxisCount = constraints.maxWidth > 768 ? 3 : 1;
            return GridView.count(
              crossAxisCount: crossAxisCount,
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              children: _certifications
                  .map((cert) => Card(
                        color: Color(0xFF2A3B4A),
                        child: Column(
                          children: [
                            Image.asset(cert.badgeUrl, height: 100, fit: BoxFit.cover),
                            SizedBox(height: 8),
                            Text(cert.name, style: Theme.of(context).textTheme.bodyLarge),
                            TextButton(
                              onPressed: () => html.window.open(cert.url, '_blank'),
                              child: Text('View Certificate', style: TextStyle(color: Color(0xFF12D640))),
                            ),
                          ],
                        ),
                      ))
                  .toList(),
            );
          },
        ),
      ],
    );
  }
}

// -----------------------------
// 18. Experience Section (experience_section.dart)
// Experience section
// -----------------------------

class ExperienceSection extends StatelessWidget {
  final List<Experience> _experiences = [
    Experience(
      organization: 'IEEE Computer Society Bangladesh Chapter Secretariat',
      role: 'President',
      period: 'January 2025 - Present',
      responsibilities: [
        'Shape the Chapter’s vision and set strategic goals...',
        'Design, host, and measure impactful events...',
      ],
    ),
    // Add more experiences
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      child: Column(
        children: [
          Text('Experience', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          ..._experiences.map((exp) => Padding(
                padding: EdgeInsets.only(bottom: 16),
                child: Card(
                  color: Color(0xFF2A3B4A),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(exp.organization, style: Theme.of(context).textTheme.bodyLarge!.copyWith(color: Color(0xFF12D640))),
                        Text(exp.role, style: Theme.of(context).textTheme.bodyLarge),
                        Text(exp.period, style: Theme.of(context).textTheme.bodyMedium),
                        SizedBox(height: 8),
                        ...exp.responsibilities.map((resp) => Padding(
                              padding: EdgeInsets.symmetric(vertical: 4),
                              child: Text('• $resp', style: Theme.of(context).textTheme.bodyMedium),
                            )),
                      ],
                    ),
                  ),
                ),
              )),
        ],
      ),
    );
  }
}

// -----------------------------
// 19. Projects Section (projects_section.dart)
// Projects section
// -----------------------------

class ProjectsSection extends StatelessWidget {
  final List<Project> _projects = [
    Project(
      name: 'MoodScope',
      type: 'Web-App',
      imageUrl: 'assets/img/project/MoodScope.jpg',
      detailsUrl: '/projects/MoodScope.html',
    ),
    // Add more projects
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      color: Color(0xFF2A3B4A),
      child: Column(
        children: [
          Text('Projects', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 768 ? 3 : 1;
              return GridView.count(
                crossAxisCount: crossAxisCount,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: _projects
                    .map((project) => Card(
                          color: Color(0xFF2A3B4A),
                          child: Column(
                            children: [
                              Image.asset(project.imageUrl, height: 150, fit: BoxFit.cover),
                              SizedBox(height: 8),
                              Text(project.name, style: Theme.of(context).textTheme.bodyLarge),
                              TextButton(
                                onPressed: () => html.window.open(project.detailsUrl, '_blank'),
                                child: Text('Details', style: TextStyle(color: Color(0xFF12D640))),
                              ),
                            ],
                          ),
                        ))
                    .toList(),
              );
            },
        ),
      ],
    );
  }
}

// -----------------------------
// 20. Skills Section (skills_section.dart)
// Skills section
// -----------------------------

class SkillsSection extends StatelessWidget {
  final List<SkillCategory> _skillCategories = [
    SkillCategory(
      name: 'Languages and Databases',
      skills: [
        Skill(name: 'Python', logoUrl: 'https://www.vectorlogo.zone/logos/python/python-horizontal.svg'),
        // Add more skills
      ],
    ),
    // Add more categories
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      child: Column(
        children: [
          Text('Skills', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          ..._skillCategories.map((category) => Padding(
                padding: EdgeInsets.only(bottom: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(category.name, style: Theme.of(context).textTheme.bodyLarge),
                    SizedBox(height: 8),
                    Wrap(
                      spacing: 16,
                      runSpacing: 16,
                      children: category.skills
                          .map((skill) => Image.network(skill.logoUrl, height: 40))
                          .toList(),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}

// -----------------------------
// 21. Resume Section (resume_section.dart)
// Resume section
// -----------------------------

class ResumeSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      color: Color(0xFF2A3B4A),
      child: Column(
        children: [
          Text('Resume', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          Container(
            height: 600,
            child: WebView(
              initialUrl: 'https://la-b-ib.github.io/resume/',
              javascriptMode: JavascriptMode.unrestricted,
            ),
          ),
        ],
      ),
    );
  }
}

// -----------------------------
// 22. Contact Section (contact_section.dart)
// Contact section
// -----------------------------

class ContactSection extends StatelessWidget {
  final Contact _contact = Contact(
    address: 'To obtain address, email me first',
    email1: 'labib.45x@gmail.com',
    email2: 'labib-x@protonmail.com',
    phone: '+1 480-400-800',
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      child: Column(
        children: [
          Text('Contact', style: Theme.of(context).textTheme.headlineMedium),
          SizedBox(height: 24),
          Text(
            'I’m hyped to crush it on AI, cybersecurity, sustainability, and career-shaping projects! Slide into my DMs, and let’s spark game-changing, community-driven solutions that light up the world!',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 24),
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 768 ? 2 : 1;
              return GridView.count(
                crossAxisCount: crossAxisCount,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  Card(
                    color: Color(0xFF2A3B4A),
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.location_on, color: Colors.white),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Address', style: Theme.of(context).textTheme.bodyLarge),
                              Text(_contact.address, style: Theme.of(context).textTheme.bodyMedium),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Card(
                    color: Color(0xFF2A3B4A),
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.share, color: Colors.white),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Social Profiles', style: Theme.of(context).textTheme.bodyLarge),
                              SocialLinks(),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Card(
                    color: Color(0xFF2A3B4A),
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.email, color: Colors.white),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Email', style: Theme.of(context).textTheme.bodyLarge),
                              Text(_contact.email1, style: TextStyle(color: Color(0xFF12D640))),
                              Text(_contact.email2, style: TextStyle(color: Color(0xFF12D640))),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  Card(
                    color: Color(0xFF2A3B4A),
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Icon(Icons.phone, color: Colors.white),
                          SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Contact', style: Theme.of(context).textTheme.bodyLarge),
                              Text(_contact.phone, style: Theme.of(context).textTheme.bodyMedium),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }
}

// -----------------------------
// 23. WebView Widget (webview.dart)
// Custom WebView widget for resume
// -----------------------------

class WebView extends StatelessWidget {
  final String initialUrl;
  final JavascriptMode javascriptMode;

  WebView({required this.initialUrl, required this.javascriptMode});

  @override
  Widget build(BuildContext context) {
    // Note: WebView is not fully supported in Flutter web. For production,
    // consider using an iframe via dart:html or a package like webview_flutter_web.
    return Container(
      color: Colors.white,
      child: Center(child: Text('WebView not supported in Flutter web preview')),
    );
  }
}

// -----------------------------
// 24. pubspec.yaml (for reference)
// Dependencies and assets
// -----------------------------

/*
name: portfolio
description: A Flutter web portfolio application

publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.0
  shared_preferences: ^2.0.0
  scrollable_positioned_list: ^0.3.0
  universal_html: ^2.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/img/profile.jpeg
    - assets/img/education/bu.png
    - assets/img/certification/tw.jpg
    - assets/img/project/MoodScope.jpg
*/