const express = require('express');
const multer = require('multer');
const supabase = require('../config/supabase');
const router = express.Router();

// Configure Multer for multiple file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    console.log('Multer file:', file);
    if (file && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

// Helper function to upload image
async function uploadImage(file, folder) {
  const fileExt = file.mimetype.split('/')[1];
  const fileName = `${folder}/image-${Date.now()}.${fileExt}`;
  console.log(`Uploading to Supabase Storage: ${fileName}`);
  const { data, error: uploadError } = await supabase.storage
    .from('banners')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });
  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error('Image upload failed: ' + uploadError.message);
  }
  const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
  return urlData.publicUrl;
}

// POST: Create new banner
router.post('/banner', upload.single('backgroundImage'), async (req, res) => {
  try {
    console.log('POST /api/content/banner received:', { body: req.body, file: req.file });
    const { heading, subtext } = req.body;
    const file = req.file;

    if (!file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!heading || !subtext) {
      console.log('Missing heading or subtext');
      return res.status(400).json({ message: 'Heading and subtext are required' });
    }

    const imageUrl = await uploadImage(file, 'banners');
    console.log('Uploaded image URL:', imageUrl);

    console.log('Creating new banner');
    const { data: newBanner, error: insertError } = await supabase
      .from('banners')
      .insert([{ heading, subtext, background_image: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating banner: ' + insertError.message);
    }

    console.log('Banner created:', newBanner);
    res.status(200).json({ message: 'Banner created successfully', banner: newBanner });
  } catch (error) {
    console.error('POST /api/content/banner error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest banner
router.get('/banner', async (req, res) => {
  try {
    console.log('GET /api/content/banner called');
    const { data: banners, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching banner: ' + error.message);
    }
    if (!banners) {
      console.warn('No banner found');
      return res.status(404).json({ message: 'No banner found' });
    }

    console.log('Fetched banner:', banners);
    res.status(200).json(banners);
  } catch (error) {
    console.error('GET /api/content/banner error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Who We Are
router.post('/who-we-are', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/who-we-are received:', { body: req.body, file: req.file });
    const { content } = req.body;
    const file = req.file;

    if (!file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!content) {
      console.log('Missing content');
      return res.status(400).json({ message: 'Content is required' });
    }

    const imageUrl = await uploadImage(file, 'who_we_are');
    console.log('Uploaded image URL:', imageUrl);

    console.log('Creating new who_we_are entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('who_we_are')
      .insert([{ content, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating who_we_are entry: ' + insertError.message);
    }

    console.log('Who We Are created:', newEntry);
    res.status(200).json({ message: 'Who We Are created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/who-we-are error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Who We Are
router.get('/who-we-are', async (req, res) => {
  try {
    console.log('GET /api/content/who-we-are called');
    const { data: entry, error } = await supabase
      .from('who_we_are')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching who_we_are: ' + error.message);
    }
    if (!entry) {
      console.warn('No who_we_are found');
      return res.status(404).json({ message: 'No who_we_are found' });
    }

    console.log('Fetched who_we_are:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/who-we-are error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Values, Vision, Mission
router.post('/values-vision-mission', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/values-vision-mission received:', { body: req.body, file: req.file });
    const { values, vision, mission } = req.body;
    const file = req.file;

    if (!file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!values || !vision || !mission) {
      console.log('Missing values, vision, or mission');
      return res.status(400).json({ message: 'Values, vision, and mission are required' });
    }

    const imageUrl = await uploadImage(file, 'values_vision_mission');
    console.log('Uploaded image URL:', imageUrl);

    console.log('Creating new values_vision_mission entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('values_vision_mission')
      .insert([{ values, vision, mission, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating values_vision_mission entry: ' + insertError.message);
    }

    console.log('Values, Vision, Mission created:', newEntry);
    res.status(200).json({ message: 'Values, Vision, Mission created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/values-vision-mission error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Values, Vision, Mission
router.get('/values-vision-mission', async (req, res) => {
  try {
    console.log('GET /api/content/values-vision-mission called');
    const { data: entry, error } = await supabase
      .from('values_vision_mission')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching values_vision_mission: ' + error.message);
    }
    if (!entry) {
      console.warn('No values_vision_mission found');
      return res.status(404).json({ message: 'No values_vision_mission found' });
    }

    console.log('Fetched values_vision_mission:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/values-vision-mission error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Our Presence
router.post('/our-presence', async (req, res) => {
  try {
    console.log('POST /api/content/our-presence received:', { body: req.body });
    const { locations } = req.body;

    if (!locations || !Array.isArray(locations) || locations.length === 0) {
      console.log('Invalid locations');
      return res.status(400).json({ message: 'Locations array is required' });
    }

    console.log('Creating new our_presence entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('our_presence')
      .insert([{ locations }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating our_presence entry: ' + insertError.message);
    }

    console.log('Our Presence created:', newEntry);
    res.status(200).json({ message: 'Our Presence created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/our-presence error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Our Presence
router.get('/our-presence', async (req, res) => {
  try {
    console.log('GET /api/content/our-presence called');
    const { data: entry, error } = await supabase
      .from('our_presence')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching our_presence: ' + error.message);
    }
    if (!entry) {
      console.warn('No our_presence found');
      return res.status(404).json({ message: 'No our_presence found' });
    }

    console.log('Fetched our_presence:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/our-presence error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Our Business
router.post('/our-business', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/our-business received:', { body: req.body, file: req.file });
    const { description } = req.body;
    const file = req.file;

    if (!file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!description) {
      console.log('Missing description');
      return res.status(400).json({ message: 'Description is required' });
    }

    const imageUrl = await uploadImage(file, 'our_business');
    console.log('Uploaded image URL:', imageUrl);

    console.log('Creating new our_business entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('our_business')
      .insert([{ description, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating our_business entry: ' + insertError.message);
    }

    console.log('Our Business created:', newEntry);
    res.status(200).json({ message: 'Our Business created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/our-business error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Our Business
router.get('/our-business', async (req, res) => {
  try {
    console.log('GET /api/content/our-business called');
    const { data: entry, error } = await supabase
      .from('our_business')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching our_business: ' + error.message);
    }
    if (!entry) {
      console.warn('No our_business found');
      return res.status(404).json({ message: 'No our_business found' });
    }

    console.log('Fetched our_business:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/our-business error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new About Us
router.post('/about-us', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/about-us received:', { body: req.body, file: req.file });
    const { content } = req.body;
    const file = req.file;

    if (!file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!content) {
      console.log('Missing content');
      return res.status(400).json({ message: 'Content is required' });
    }

    const imageUrl = await uploadImage(file, 'about_us');
    console.log('Uploaded image URL:', imageUrl);

    console.log('Creating new about_us entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('about_us')
      .insert([{ content, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating about_us entry: ' + insertError.message);
    }

    console.log('About Us created:', newEntry);
    res.status(200).json({ message: 'About Us created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/about-us error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest About Us
router.get('/about-us', async (req, res) => {
  try {
    console.log('GET /api/content/about-us called');
    const { data: entry, error } = await supabase
      .from('about_us')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching about_us: ' + error.message);
    }
    if (!entry) {
      console.warn('No about_us found');
      return res.status(404).json({ message: 'No about_us found' });
    }

    console.log('Fetched about_us:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/about-us error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Why Choose Us
router.post('/why-choose-us', async (req, res) => {
  try {
    console.log('POST /api/content/why-choose-us received:', { body: req.body });
    const { description, features } = req.body;

    if (!description) {
      console.log('Missing description');
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!features || !Array.isArray(features) || features.length === 0) {
      console.log('Invalid features');
      return res.status(400).json({ message: 'Features array is required' });
    }

    console.log('Creating new why_choose_us entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('why_choose_us')
      .insert([{ description, features }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating why_choose_us entry: ' + insertError.message);
    }

    console.log('Why Choose Us created:', newEntry);
    res.status(200).json({ message: 'Why Choose Us created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/why-choose-us error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Why Choose Us
router.get('/why-choose-us', async (req, res) => {
  try {
    console.log('GET /api/content/why-choose-us called');
    const { data: entry, error } = await supabase
      .from('why_choose_us')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching why_choose_us: ' + error.message);
    }
    if (!entry) {
      console.warn('No why_choose_us found');
      return res.status(404).json({ message: 'No why_choose_us found' });
    }

    console.log('Fetched why_choose_us:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/why-choose-us error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Projects Description
router.post('/projects-description', async (req, res) => {
  try {
    console.log('POST /api/content/projects-description received:', { body: req.body });
    const { description } = req.body;

    if (!description) {
      console.log('Missing description');
      return res.status(400).json({ message: 'Description is required' });
    }

    console.log('Creating new projects_description entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('projects_description')
      .insert([{ description }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating projects_description entry: ' + insertError.message);
    }

    console.log('Projects Description created:', newEntry);
    res.status(200).json({ message: 'Projects Description created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/projects-description error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Projects Description
router.get('/projects-description', async (req, res) => {
  try {
    console.log('GET /api/content/projects-description called');
    const { data: entry, error } = await supabase
      .from('projects_description')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching projects_description: ' + error.message);
    }
    if (!entry) {
      console.warn('No projects_description found');
      return res.status(404).json({ message: 'No projects_description found' });
    }

    console.log('Fetched projects_description:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/projects-description error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Social Media Posts
router.post('/social-media-posts', upload.array('images', 6), async (req, res) => {
  try {
    console.log('POST /api/content/social-media-posts received:', { body: req.body, files: req.files });
    const files = req.files;
    let alt_texts = req.body.alt_texts;

    // Parse alt_texts if it's a string
    if (typeof alt_texts === 'string') {
      try {
        alt_texts = JSON.parse(alt_texts);
        console.log('Parsed alt_texts:', alt_texts);
      } catch (error) {
        console.log('Invalid JSON for alt_texts:', alt_texts);
        return res.status(400).json({ message: 'Invalid alt_texts format' });
      }
    }

    if (!files || files.length === 0) {
      console.log('No files uploaded');
      return res.status(400).json({ message: 'At least one image is required' });
    }
    if (!alt_texts || !Array.isArray(alt_texts) || alt_texts.length !== files.length) {
      console.log('Invalid or mismatched alt_texts:', alt_texts, 'Files count:', files.length);
      return res.status(400).json({ message: `Alt texts must match the number of images (${files.length})` });
    }

    const imageData = {};
    for (let i = 0; i < files.length; i++) {
      const imageUrl = await uploadImage(files[i], 'social_media_posts');
      console.log(`Uploaded image ${i + 1} URL:`, imageUrl);
      imageData[`image_${i + 1}_url`] = imageUrl;
      imageData[`image_${i + 1}_alt`] = alt_texts[i];
    }

    console.log('Creating new social_media_posts entry with data:', imageData);
    const { data: newEntry, error: insertError } = await supabase
      .from('social_media_posts')
      .insert([imageData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating social_media_posts entry: ' + insertError.message);
    }

    console.log('Social Media Posts created:', newEntry);
    res.status(200).json({ message: 'Social Media Posts created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/social-media-posts error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Social Media Posts
router.get('/social-media-posts', async (req, res) => {
  try {
    console.log('GET /api/content/social-media-posts called');
    const { data: entry, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching social_media_posts: ' + error.message);
    }
    if (!entry) {
      console.warn('No social_media_posts found');
      return res.status(404).json({ message: 'No social_media_posts found' });
    }

    console.log('Fetched social_media_posts:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/social-media-posts error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Company Statistics
router.post('/company-statistics', async (req, res) => {
  try {
    console.log('POST /api/content/company-statistics received:', { body: req.body });
    const { years_of_excellence, million_sq_ft_developed, happy_families, lakh_sq_ft_under_construction, successful_projects, prime_locations } = req.body;

    if (!years_of_excellence || !million_sq_ft_developed || !happy_families || !lakh_sq_ft_under_construction || !successful_projects || !prime_locations) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All statistics fields are required' });
    }

    console.log('Creating new company_statistics entry');
    const { data: newEntry, error: insertError } = await supabase
      .from('company_statistics')
      .insert([{
        years_of_excellence,
        million_sq_ft_developed,
        happy_families,
        lakh_sq_ft_under_construction,
        successful_projects,
        prime_locations
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating company_statistics entry: ' + insertError.message);
    }

    console.log('Company Statistics created:', newEntry);
    res.status(200).json({ message: 'Company Statistics created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/company-statistics error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch latest Company Statistics
router.get('/company-statistics', async (req, res) => {
  try {
    console.log('GET /api/content/company-statistics called');
    const { data: entry, error } = await supabase
      .from('company_statistics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('GET error:', error);
      throw new Error('Error fetching company_statistics: ' + error.message);
    }
    if (!entry) {
      console.warn('No company_statistics found');
      return res.status(404).json({ message: 'No company_statistics found' });
    }

    console.log('Fetched company_statistics:', entry);
    res.status(200).json(entry);
  } catch (error) {
    console.error('GET /api/content/company-statistics error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch all Projects
router.get('/projects', async (req, res) => {
  try {
    console.log('GET /api/content/projects called');
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('GET error:', error);
      throw new Error('Error fetching projects: ' + error.message);
    }
    if (!projects || projects.length === 0) {
      console.warn('No projects found');
      return res.status(200).json([]);
    }

    // Log project IDs and names for debugging
    console.log('Fetched projects:', projects.map(p => ({ id: p.id, name: p.name })));
    res.status(200).json(projects);
  } catch (error) {
    console.error('GET /api/content/projects error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch project by ID
router.get('/projects/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/content/projects/id/${id} called`);
    // Validate numeric ID
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      console.warn('Invalid project ID:', id);
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', parsedId)
      .single();
    if (error || !project) {
      console.warn('Project not found:', { id });
      return res.status(404).json({ message: 'Project not found' });
    }
    console.log('Fetched project:', project);
    res.status(200).json(project);
  } catch (error) {
    console.error('GET /api/content/projects/id/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Project
router.post('/projects', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/projects received:', { body: req.body, file: req.file });
    let { name, location, type, configurations, status, description } = req.body;
    const file = req.file;

    // Parse type and configurations if they are strings
    try {
      if (typeof type === 'string') type = JSON.parse(type);
      if (typeof configurations === 'string') configurations = JSON.parse(configurations);
    } catch (error) {
      console.log('Invalid JSON format for type or configurations:', { type, configurations });
      return res.status(400).json({ message: 'Invalid JSON format for type or configurations' });
    }

    if (!name || !location || !Array.isArray(type) || type.length === 0 || !Array.isArray(configurations) || configurations.length === 0 || !status || !description) {
      console.log('Missing required fields:', { name, location, type, configurations, status, description });
      return res.status(400).json({ message: 'Name, location, type, configurations, status, and description are required' });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file, 'projects');
      console.log('Uploaded image URL:', imageUrl);
    }

    console.log('Creating new project');
    const { data: newEntry, error: insertError } = await supabase
      .from('projects')
      .insert([{ name, location, type, configurations, status, image_url: imageUrl, description }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating project: ' + insertError.message);
    }

    console.log('Project created:', newEntry);
    res.status(200).json({ message: 'Project created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/projects error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT: Update a Project
router.put('/projects/:id', upload.single('image'), async (req, res) => {
  try {
    console.log('PUT /api/content/projects/:id received:', { id: req.params.id, body: req.body, file: req.file });
    const { id } = req.params;
    let { name, location, type, configurations, status, description } = req.body;
    const file = req.file;

    // Validate numeric ID
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      console.log('Invalid project ID:', id);
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    // Parse type and configurations if they are strings
    try {
      if (typeof type === 'string') type = JSON.parse(type);
      if (typeof configurations === 'string') configurations = JSON.parse(configurations);
    } catch (error) {
      console.log('Invalid JSON format for type or configurations:', { type, configurations });
      return res.status(400).json({ message: 'Invalid JSON format for type or configurations' });
    }

    if (!name || !location || !Array.isArray(type) || type.length === 0 || !Array.isArray(configurations) || configurations.length === 0 || !status || !description) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, location, type, configurations, status, and description are required' });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file, 'projects');
      console.log('Uploaded image URL:', imageUrl);
    }

    const updateData = { name, location, type, configurations, status, description };
    if (imageUrl) updateData.image_url = imageUrl;

    console.log('Updating project:', { id: parsedId });
    const { data: updatedEntry, error: updateError } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', parsedId)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Error updating project: ' + updateError.message);
    }
    if (!updatedEntry) {
      console.warn('Project not found:', { id: parsedId });
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log('Project updated:', updatedEntry);
    res.status(200).json({ message: 'Project updated successfully', entry: updatedEntry });
  } catch (error) {
    console.error('PUT /api/content/projects/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete a Project
router.delete('/projects/:id', async (req, res) => {
  try {
    console.log('DELETE /api/content/projects/:id received:', { id: req.params.id });
    const { id } = req.params;

    // Validate numeric ID
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      console.log('Invalid project ID:', id);
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    console.log('Deleting project:', { id: parsedId });
    const { data: deletedEntry, error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', parsedId)
      .select()
      .single();

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw new Error('Error deleting project: ' + deleteError.message);
    }
    if (!deletedEntry) {
      console.warn('Project not found:', { id: parsedId });
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log('Project deleted:', deletedEntry);
    res.status(200).json({ message: 'Project deleted successfully', entry: deletedEntry });
  } catch (error) {
    console.error('DELETE /api/content/projects/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new Blog
router.post('/blogs', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/content/blogs received:', { body: req.body, file: req.file });
    const { title, excerpt, content, author, category, status, publish_date } = req.body;
    const file = req.file;

    if (!title || !excerpt || !content || !author || !category || !status || !publish_date) {
      console.log('Missing required fields:', { title, excerpt, content, author, category, status, publish_date });
      return res.status(400).json({ message: 'Title, excerpt, content, author, category, status, and publish_date are required' });
    }

    // Validate status
    if (!['Published', 'Draft', 'Archived'].includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({ message: 'Status must be Published, Draft, or Archived' });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file, 'blogs');
      console.log('Uploaded image URL:', imageUrl);
    }

    console.log('Creating new blog');
    const { data: newEntry, error: insertError } = await supabase
      .from('blogs')
      .insert([{ title, excerpt, content, author, category, status, publish_date, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating blog: ' + insertError.message);
    }

    console.log('Blog created:', newEntry);
    res.status(200).json({ message: 'Blog created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/blogs error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch all Blogs
router.get('/blogs', async (req, res) => {
  try {
    console.log('GET /api/content/blogs called');
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('GET error:', error);
      throw new Error('Error fetching blogs: ' + error.message);
    }

    console.log('Fetched blogs:', blogs);
    res.status(200).json(blogs || []);
  } catch (error) {
    console.error('GET /api/content/blogs error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch Blog by ID
router.get('/blogs/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/content/blogs/id/${id} called`);
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !blog) {
      console.warn('Blog not found:', { id });
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    const { error: updateError } = await supabase
      .from('blogs')
      .update({ views: blog.views + 1 })
      .eq('id', id);

    if (updateError) {
      console.error('Update views error:', updateError);
    }

    console.log('Fetched blog:', blog);
    res.status(200).json(blog);
  } catch (error) {
    console.error('GET /api/content/blogs/id/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT: Update a Blog
router.put('/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    console.log('PUT /api/content/blogs/:id received:', { id: req.params.id, body: req.body, file: req.file });
    const { id } = req.params;
    const { title, excerpt, content, author, category, status, publish_date } = req.body;
    const file = req.file;

    if (!title || !excerpt || !content || !author || !category || !status || !publish_date) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Title, excerpt, content, author, category, status, and publish_date are required' });
    }

    // Validate status
    if (!['Published', 'Draft', 'Archived'].includes(status)) {
      console.log('Invalid status:', status);
      return res.status(400).json({ message: 'Status must be Published, Draft, or Archived' });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file, 'blogs');
      console.log('Uploaded image URL:', imageUrl);
    }

    const updateData = { title, excerpt, content, author, category, status, publish_date };
    if (imageUrl) updateData.image_url = imageUrl;

    console.log('Updating blog:', { id });
    const { data: updatedEntry, error: updateError } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Error updating blog: ' + updateError.message);
    }
    if (!updatedEntry) {
      console.warn('Blog not found:', { id });
      return res.status(404).json({ message: 'Blog not found' });
    }

    console.log('Blog updated:', updatedEntry);
    res.status(200).json({ message: 'Blog updated successfully', entry: updatedEntry });
  } catch (error) {
    console.error('PUT /api/content/blogs/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete a Blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    console.log('DELETE /api/content/blogs/:id received:', { id: req.params.id });
    const { id } = req.params;

    console.log('Deleting blog:', { id });
    const { data: deletedEntry, error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw new Error('Error deleting blog: ' + deleteError.message);
    }
    if (!deletedEntry) {
      console.warn('Blog not found:', { id });
      return res.status(404).json({ message: 'Blog not found' });
    }

    console.log('Blog deleted:', deletedEntry);
    res.status(200).json({ message: 'Blog deleted successfully', entry: deletedEntry });
  } catch (error) {
    console.error('DELETE /api/content/blogs/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Create new FAQ
router.post('/faqs', async (req, res) => {
  try {
    console.log('POST /api/content/faqs received:', req.body);
    const { question, answer, category, last_updated } = req.body;

    if (!question || !answer || !category || !last_updated) {
      console.log('Missing required fields:', { question, answer, category, last_updated });
      return res.status(400).json({ message: 'Question, answer, category, and last_updated are required' });
    }

    console.log('Creating new FAQ');
    const { data: newEntry, error: insertError } = await supabase
      .from('faqs')
      .insert([{ question, answer, category, last_updated }])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Error creating FAQ: ' + insertError.message);
    }

    console.log('FAQ created:', newEntry);
    res.status(200).json({ message: 'FAQ created successfully', entry: newEntry });
  } catch (error) {
    console.error('POST /api/content/faqs error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch all FAQs
router.get('/faqs', async (req, res) => {
  try {
    console.log('GET /api/content/faqs called');
    const { data: faqs, error } = await supabase
      .from('faqs')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error) {
      console.error('GET error:', error);
      throw new Error('Error fetching FAQs: ' + error.message);
    }

    console.log('Fetched FAQs:', faqs);
    res.status(200).json(faqs || []);
  } catch (error) {
    console.error('GET /api/content/faqs error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch FAQ by ID
router.get('/faqs/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/content/faqs/id/${id} called`);
    const { data: faq, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !faq) {
      console.warn('FAQ not found:', { id });
      return res.status(404).json({ message: 'FAQ not found' });
    }

    console.log('Fetched FAQ:', faq);
    res.status(200).json(faq);
  } catch (error) {
    console.error('GET /api/content/faqs/id/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT: Update an FAQ
router.put('/faqs/:id', async (req, res) => {
  try {
    console.log('PUT /api/content/faqs/:id received:', { id: req.params.id, body: req.body });
    const { id } = req.params;
    const { question, answer, category, last_updated } = req.body;

    if (!question || !answer || !category || !last_updated) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Question, answer, category, and last_updated are required' });
    }

    console.log('Updating FAQ:', { id });
    const { data: updatedEntry, error: updateError } = await supabase
      .from('faqs')
      .update({ question, answer, category, last_updated })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Error updating FAQ: ' + updateError.message);
    }
    if (!updatedEntry) {
      console.warn('FAQ not found:', { id });
      return res.status(404).json({ message: 'FAQ not found' });
    }

    console.log('FAQ updated:', updatedEntry);
    res.status(200).json({ message: 'FAQ updated successfully', entry: updatedEntry });
  } catch (error) {
    console.error('PUT /api/content/faqs/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete an FAQ
router.delete('/faqs/:id', async (req, res) => {
  try {
    console.log('DELETE /api/content/faqs/:id received:', { id: req.params.id });
    const { id } = req.params;

    console.log('Deleting FAQ:', { id });
    const { data: deletedEntry, error: deleteError } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw new Error('Error deleting FAQ: ' + deleteError.message);
    }
    if (!deletedEntry) {
      console.warn('FAQ not found:', { id });
      return res.status(404).json({ message: 'FAQ not found' });
    }

    console.log('FAQ deleted:', deletedEntry);
    res.status(200).json({ message: 'FAQ deleted successfully', entry: deletedEntry });
  } catch (error) {
    console.error('DELETE /api/content/faqs/:id error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;