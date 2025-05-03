// resume_app.dart - Flutter web application for Labib Bin Shahed's interactive resume
// Author: Grok 3 (xAI)
// Date: May 03, 2025
// Description: A Flutter web app replicating the resume's UI and functionality with
// widget-based layout, state management, and dynamic data rendering.

// ---------------------------
// 1. Main Entry Point
// Initializes the Flutter application
// ---------------------------

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'models.dart';
import 'settings_provider.dart';
import 'resume_screen.dart';

void main() {
  runApp(const ResumeApp());
}

class ResumeApp extends StatelessWidget {
  const ResumeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SettingsProvider(),
      child: MaterialApp(
        title: 'Labib Bin Shahed Resume',
        theme: ThemeData(
          primaryColor: const Color(0xFF007AFF),
          scaffoldBackgroundColor: const Color(0xFF000E1B),
          textTheme: const TextTheme(
            headlineLarge: TextStyle(fontSize: 48, fontWeight: FontWeight.w700, color: Color(0xFF15CE49)),
            headlineMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: Color(0xFF15CE49)),
            headlineSmall: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: Color(0xFF15CE49)),
            bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFFE0E0E0)),
          ),
        ),
        home: const ResumeScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

// ---------------------------
// 2. Models
// Data models for resume sections
// ---------------------------

class Resume {
  final Profile profile;
  final List<Education> education;
  final List<Certification> certifications;
  final List<ResearchPublication> researchPublications;
  final List<SkillCategory> skills;
  final List<Project> projects;
  final List<Experience> experiences;
  final Collaboration collaboration;

  Resume({
    required this.profile,
    required this.education,
    required this.certifications,
    required this.researchPublications,
    required this.skills,
    required this.projects,
    required this.experiences,
    required this.collaboration,
  });
}

class Profile {
  final String name;
  final String title;
  final String profilePictureUrl;

  Profile({required this.name, required this.title, required this.profilePictureUrl});
}

class Education {
  final String institution;
  final String degree;
  final String period;
  final String coursework;

  Education({
    required this.institution,
    required this.degree,
    required this.period,
    required this.coursework,
  });
}

class Certification {
  final String name;
  final String url;
  final String badgeUrl;

  Certification({required this.name, required this.url, required this.badgeUrl});
}

class ResearchPublication {
  final String title;
  final String description;
  final List<Badge> badges;

  ResearchPublication({required this.title, required this.description, required this.badges});
}

class SkillCategory {
  final String category;
  final List<Skill> skills;

  SkillCategory({required this.category, required this.skills});
}

class Skill {
  final String name;
  final String url;
  final String badgeUrl;

  Skill({required this.name, required this.url, required this.badgeUrl});
}

class Project {
  final String name;
  final String url;
  final String badgeUrl;

  Project({required this.name, required this.url, required this.badgeUrl});
}

class Experience {
  final String organization;
  final String role;
  final String period;
  final List<String> responsibilities;

  Experience({
    required this.organization,
    required this.role,
    required this.period,
    required this.responsibilities,
  });
}

class Collaboration {
  final String message;
  final String quote;
  final List<SocialLink> links;

  Collaboration({required this.message, required this.quote, required this.links});
}

class SocialLink {
  final String platform;
  final String url;
  final String badgeUrl;

  SocialLink({required this.platform, required this.url, required this.badgeUrl});
}

class Badge {
  final String label;
  final String url;
  final String badgeUrl;

  Badge({required this.label, required this.url, required this.badgeUrl});
}

// ---------------------------
// 3. Settings Provider
// Manages app settings (font size, card style, section visibility)
// ---------------------------

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsProvider with ChangeNotifier {
  String _fontSize = 'Large';
  String _cardStyle = 'default';
  String _sectionVisibility = 'all';
  String _searchQuery = '';

  String get fontSize => _fontSize;
  String get cardStyle => _cardStyle;
  String get sectionVisibility => _sectionVisibility;
  String get searchQuery => _searchQuery;

  SettingsProvider() {
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _fontSize = prefs.getString('fontSize') ?? 'Large';
    _cardStyle = prefs.getString('cardStyle') ?? 'default';
    _sectionVisibility = prefs.getString('sectionVisibility') ?? 'all';
    notifyListeners();
  }

  Future<void> setFontSize(String size) async {
    _fontSize = size;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('fontSize', size);
    notifyListeners();
  }

  Future<void> setCardStyle(String style) async {
    _cardStyle = style;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('cardStyle', style);
    notifyListeners();
  }

  Future<void> setSectionVisibility(String section) async {
    _sectionVisibility = section;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('sectionVisibility', section);
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  Future<void> resetSettings() async {
    _fontSize = 'Large';
    _cardStyle = 'default';
    _sectionVisibility = 'all';
    _searchQuery = '';
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('fontSize');
    await prefs.remove('cardStyle');
    await prefs.remove('sectionVisibility');
    notifyListeners();
  }
}

// ---------------------------
// 4. Resume Screen
// Main widget for the resume UI
// ---------------------------

class ResumeScreen extends StatefulWidget {
  const ResumeScreen({super.key});

  @override
  _ResumeScreenState createState() => _ResumeScreenState();
}

class _ResumeScreenState extends State<ResumeScreen> {
  final ScrollController _scrollController = ScrollController();
  bool _isMenuOpen = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          _buildMainContent(context),
          _buildSettingsPanel(context),
          _buildSideMenu(context),
        ],
      ),
    );
  }

  Widget _buildMainContent(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    final double fontSize = _getFontSize(settings.fontSize);
    final resume = _getResumeData();

    return SingleChildScrollView(
      controller: _scrollController,
      child: Padding(
        padding: const EdgeInsets.all(30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(resume.profile, fontSize),
            const SizedBox(height: 30),
            _buildSections(resume, settings, fontSize),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(Profile profile, double fontSize) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.zero,
          child: Image.network(
            profile.profilePictureUrl,
            width: 120,
            height: 120,
            fit: BoxFit.cover,
          ),
        ),
        const SizedBox(width: 20),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                profile.name,
                style: Theme.of(context).textTheme.headlineLarge!.copyWith(fontSize: fontSize * 2.5),
              ),
              Text(
                profile.title,
                style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSections(Resume resume, SettingsProvider settings, double fontSize) {
    final sections = [
      {'name': 'education', 'icon': Icons.school, 'data': resume.education, 'widget': (item) => _buildEducationCard(item, fontSize)},
      {'name': 'certifications', 'icon': Icons.verified, 'data': resume.certifications, 'widget': (item) => _buildCertificationCard(item, fontSize)},
      {'name': 'research', 'icon': Icons.description, 'data': resume.researchPublications, 'widget': (item) => _buildResearchCard(item, fontSize)},
      {'name': 'skills', 'icon': Icons.build, 'data': resume.skills, 'widget': (item) => _buildSkillCard(item, fontSize)},
      {'name': 'projects', 'icon': Icons.work, 'data': resume.projects, 'widget': (item) => _buildProjectCard(item, fontSize)},
      {'name': 'experience', 'icon': Icons.business, 'data': resume.experiences, 'widget': (item) => _buildExperienceCard(item, fontSize)},
      {'name': 'collaboration', 'icon': Icons.group, 'data': [resume.collaboration], 'widget': (item) => _buildCollaborationCard(item, fontSize)},
    ];

    return Column(
      children: sections.where((section) {
        final query = settings.searchQuery.toLowerCase();
        if (query.isEmpty) return settings.sectionVisibility == 'all' || settings.sectionVisibility == section['name'];
        return section['data'].any((item) => item.toString().toLowerCase().contains(query));
      }).map((section) {
        return _buildSection(
          section['name'] as String,
          section['icon'] as IconData,
          section['data'] as List,
          section['widget'] as Widget Function(dynamic),
          settings.cardStyle,
          fontSize,
        );
      }).toList(),
    );
  }

  Widget _buildSection(String name, IconData icon, List data, Widget Function(dynamic) buildCard, String cardStyle, double fontSize) {
    return AnimatedOpacity(
      opacity: data.isNotEmpty ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 300),
      child: Container(
        margin: const EdgeInsets.only(bottom: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: const Color(0xFF15CE49), size: 24),
                const SizedBox(width: 8),
                Text(
                  name.toUpperCase(),
                  style: Theme.of(context).textTheme.headlineMedium!.copyWith(fontSize: fontSize * 1.5),
                ),
              ],
            ),
            const SizedBox(height: 10),
            cardStyle == 'grid' && data.length > 1
                ? GridView.count(
                    crossAxisCount: 2,
                    crossAxisSpacing: 20,
                    mainAxisSpacing: 20,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    children: data.map((item) => buildCard(item)).toList(),
                  )
                : Column(
                    children: data.map((item) => Padding(
                      padding: const EdgeInsets.only(bottom: 20),
                      child: buildCard(item),
                    )).toList(),
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildEducationCard(Education edu, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${edu.institution} | ${edu.period}',
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize * 1.25),
          ),
          Text(
            edu.degree,
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize, opacity: 0.85),
          ),
          Text(
            'Relevant Coursework: ${edu.coursework}',
            style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
          ),
        ],
      ),
    );
  }

  Widget _buildCertificationCard(Certification cert, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Image.network(cert.badgeUrl, height: 25),
          const SizedBox(width: 10),
          Text(
            cert.name,
            style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
          ),
        ],
      ),
    );
  }

  Widget _buildResearchCard(ResearchPublication pub, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            pub.title,
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize * 1.25),
          ),
          Text(
            pub.description,
            style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
          ),
          Wrap(
            spacing: 8,
            children: pub.badges.map((badge) => Image.network(badge.badgeUrl, height: 25)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSkillCard(SkillCategory category, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            category.category,
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize * 1.25),
          ),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: category.skills.map((skill) => Image.network(skill.badgeUrl, height: 25)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildProjectCard(Project project, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Image.network(project.badgeUrl, height: 25),
          const SizedBox(width: 10),
          Text(
            project.name,
            style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
          ),
        ],
      ),
    );
  }

  Widget _buildExperienceCard(Experience exp, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${exp.organization} | ${exp.period}',
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize * 1.25),
          ),
          Text(
            exp.role,
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize, opacity: 0.85),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: exp.responsibilities.map((resp) => Text(
              '• $resp',
              style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize),
            )).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCollaborationCard(Collaboration collab, double fontSize) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            collab.message,
            style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontSize: fontSize * 1.25),
          ),
          Text(
            collab.quote,
            style: Theme.of(context).textTheme.bodyLarge!.copyWith(fontSize: fontSize, fontStyle: FontStyle.italic),
          ),
          Wrap(
            spacing: 8,
            children: collab.links.map((link) => Image.network(link.badgeUrl, height: 25)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsPanel(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    return Positioned(
      top: 0,
      right: 0,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        color: const Color(0xCC1E2529),
        child: Row(
          children: [
            SizedBox(
              width: 160,
              child: TextField(
                decoration: const InputDecoration(
                  hintText: 'Search',
                  hintStyle: TextStyle(color: Color(0x99E0E0E0), fontWeight: FontWeight.w700),
                  border: InputBorder.none,
                ),
                style: const TextStyle(color: Color(0xFFE0E0E0), fontWeight: FontWeight.w700),
                onChanged: settings.setSearchQuery,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.settings, color: Color(0xFF15CE49)),
              onPressed: () {
                setState(() {
                  _isMenuOpen = !_isMenuOpen;
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSideMenu(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    return AnimatedPositioned(
      duration: const Duration(milliseconds: 400),
      top: MediaQuery.of(context).size.height * 0.1,
      right: _isMenuOpen ? 0 : -300,
      child: Container(
        width: 300,
        height: MediaQuery.of(context).size.height * 0.8,
        padding: const EdgeInsets.all(16),
        color: const Color(0xFF08213A),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'SETTINGS',
              style: TextStyle(color: Color(0xFF15CE49), fontSize: 18, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 16),
            _buildMenuItem(
              'Text Size',
              Icons.text_fields,
              DropdownButton<String>(
                value: settings.fontSize,
                items: ['Small', 'Medium', 'Large', 'Extra Large'].map((size) => DropdownMenuItem(
                  value: size,
                  child: Text(size, style: const TextStyle(color: Color(0xFF15CE49))),
                )).toList(),
                onChanged: (value) {
                  if (value != null) settings.setFontSize(value);
                },
              ),
            ),
            _buildMenuItem(
              'Card Style',
              Icons.view_module,
              DropdownButton<String>(
                value: settings.cardStyle,
                items: ['default', 'grid'].map((style) => DropdownMenuItem(
                  value: style,
                  child: Text(style, style: const TextStyle(color: Color(0xFF15CE49))),
                )).toList(),
                onChanged: (value) {
                  if (value != null) settings.setCardStyle(value);
                },
              ),
            ),
            _buildMenuItem(
              'Section Visibility',
              Icons.visibility,
              DropdownButton<String>(
                value: settings.sectionVisibility,
                items: ['all', 'education', 'certifications', 'research', 'skills', 'projects', 'experience', 'collaboration'].map((section) => DropdownMenuItem(
                  value: section,
                  child: Text(section, style: const TextStyle(color: Color(0xFF15CE49))),
                )).toList(),
                onChanged: (value) {
                  if (value != null) settings.setSectionVisibility(value);
                },
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              children: [
                _buildActionButton(Icons.download, const Color(0xFF34A853), () {}),
                _buildActionButton(Icons.text_fields, const Color(0xFF4285F4), () {}),
                _buildActionButton(Icons.arrow_upward, const Color(0xFF7950F2), () {
                  _scrollController.animateTo(0, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
                }),
                _buildActionButton(Icons.sync, const Color(0xFFFF6200), settings.resetSettings),
                _buildActionButton(Icons.close, const Color(0xFF8B0000), () {
                  setState(() {
                    _isMenuOpen = false;
                  });
                }),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(String label, IconData icon, Widget child) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: const Color(0xFF15CE49), size: 28),
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(color: Color(0xFF15CE49), fontSize: 14, fontWeight: FontWeight.w700),
              ),
            ],
          ),
          const SizedBox(height: 8),
          child,
        ],
      ),
    );
  }

  Widget _buildActionButton(IconData icon, Color color, VoidCallback onPressed) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8),
      ),
      child: IconButton(
        icon: Icon(icon, color: Colors.white, size: 20),
        onPressed: onPressed,
      ),
    );
  }

  double _getFontSize(String size) {
    switch (size) {
      case 'Small':
        return 14;
      case 'Medium':
        return 16;
      case 'Large':
        return 19.5;
      case 'Extra Large':
        return 22;
      default:
        return 19.5;
    }
  }

  Resume _getResumeData() {
    return Resume(
      profile: Profile(
        name: 'Labib Bin Shahed',
        title: 'CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher | IEEE CSBDC Secretariat President 2025 | Open Source Contributor',
        profilePictureUrl: 'https://raw.githubusercontent.com/la-b-ib/la-b-ib.github.io/main/assets/img/labib.png',
      ),
      education: [
        Education(
          institution: 'BRAC University',
          degree: 'B.Sc in Computer Science and Engineering',
          period: 'January 2022 - Present',
          coursework: 'Cloud Computing, Machine Learning & Deep Learning, Database Management Systems, Algorithms & Optimization',
        ),
      ],
      certifications: [
        Certification(
          name: 'Twilio',
          url: 'https://www.linkedin.com/learning/certificates/759119dcc46bdb4e63fb82dc49ed0ad4288a97d9031dd360fdb0686f65b0b398',
          badgeUrl: 'https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white&labelStyle=bold',
        ),
        Certification(
          name: 'PMI',
          url: 'https://www.linkedin.com/learning/certificates/fe897b3437597f8b933ad2501b5de695916b026e0c841509df9545ecd7d83b0b',
          badgeUrl: 'https://img.shields.io/badge/PMI-8C1D40?style=for-the-badge&logo=project-management-institute&logoColor=white&labelStyle=bold',
        ),
      ],
      researchPublications: [
        ResearchPublication(
          title: 'Blockchain in Project Management',
          description: 'IEEE ICEIC 2025, Osaka | Ethereum-powered solution with Flutter and OCI',
          badges: [
            Badge(
              label: 'DOI',
              url: 'https://doi.org/10.1109/ICEIC64972.2025.10879668',
              badgeUrl: 'https://img.shields.io/badge/DOI-10.1109%2FICEIC64972.2025.10879668-orange?style=for-the-badge&labelStyle=bold',
            ),
          ],
        ),
      ],
      skills: [
        SkillCategory(
          category: 'Languages & Databases',
          skills: [
            Skill(
              name: 'Python',
              url: 'https://www.python.org/',
              badgeUrl: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white&labelStyle=bold',
            ),
            Skill(
              name: 'Java',
              url: 'https://www.java.com/',
              badgeUrl: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white&labelStyle=bold',
            ),
          ],
        ),
        SkillCategory(
          category: 'Frameworks, Libraries, Tools & Operating Systems',
          skills: [
            Skill(
              name: 'Django',
              url: 'https://www.djangoproject.com/',
              badgeUrl: 'https://img.shields.io/badge/Django-092E20?style.for-the-badge&logo=django&logoColor=white&labelStyle=bold',
            ),
            Skill(
              name: 'Ubuntu',
              url: 'https://ubuntu.com/',
              badgeUrl: 'https://img.shields.io/badge/Ubuntu-E95420?style.for-the-badge&logo=ubuntu&logoColor=white&labelStyle=bold',
            ),
          ],
        ),
      ],
      projects: [
        Project(
          name: 'LeafByte',
          url: 'https://github.com/la-b-ib/LeafByte',
          badgeUrl: 'https://img.shields.io/badge/LeafByte-006400?style.for-the-badge&logo=leaf&logoColor=white&labelStyle=bold',
        ),
      ],
      experiences: [
        Experience(
          organization: 'IEEE Computer Society Bangladesh Chapter Secretariat',
          role: 'President',
          period: 'January 2025 - Present',
          responsibilities: [
            'Define and execute strategic vision aligned with IEEE CS BDC Ex-Com directives.',
            'Orchestrate high-impact events to advance computer science education and innovation.',
          ],
        ),
      ],
      collaboration: Collaboration(
        message: 'Let’s build solutions that make a difference, globally!',
        quote: '“Code smart. Build secure. Scale global.”',
        links: [
          SocialLink(
            platform: 'Email',
            url: 'mailto:labib.45x@gmail.com',
            badgeUrl: 'https://img.shields.io/badge/Email-D14836?style.for-the-badge&logo=gmail&logoColor=white&labelStyle=bold',
          ),
          SocialLink(
            platform: 'GitHub',
            url: 'https://github.com/la-b-ib',
            badgeUrl: 'https://img.shields.io/badge/GitHub-181717?style.for-the-badge&logo=github&logoColor=white&labelStyle=bold',
          ),
        ],
      ),
    );
  }
}