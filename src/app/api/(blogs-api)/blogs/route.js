// import { Blog } from "@/lib/models/blog";
// import { mongooseConnect } from "@/lib/mongoose";

// export default async function handle(req, res) {
//     await mongooseConnect();

//     const { method } = req;
//     // create  blog 
//     if (method === 'POST') {
//         const {
//             title,
//             slug,
//             category,
//             description,
//             tags,
//             status, } = req.body;

//         const blogDoc = await Blog.create({
//             title,
//             slug,
//             category,
//             description,
//             tags,
//             status,
//         })

//         req.json(blogDoc);
//     }
//     // get blog 
//     if (method === 'GET') {
//         if (req.query) {
//             req.json(await Blog.findbyId(req.query.id));
//         } else {
//             req.json((await Blog.find().reverse()));
//         }
//     }

//     // update blog by id
//     if (method === 'PUT') {
//         const {
//             title,
//             slug,
//             category,
//             description,
//             tags,
//             status, } = req.body;
//         await Blog.updateOne({ _id }, {
//             title,
//             slug,
//             category,
//             description,
//             tags,
//             status,
//         });

//         res.json(true);
//     }

//     // delete blog by id 
//     if (method === 'DELETE') {
//         if (req.query?.id) {
//             await Blog.deleteOne({ _id: req.query?.id });
//             res.json(true);
//         }
//     }
// }

import { Blog } from "@/lib/models/blog";
import { mongooseConnect } from "@/lib/mongoose";

export async function POST(req, res) {
    await mongooseConnect();

    try {
        const body = await req.json(); // Ensure the body is being parsed correctly
        const { title, slug, category, description, tags, status } = body;

        if (!title || !slug || !category || !description || !tags || !status) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        const blogDoc = await Blog.create({
            title,
            slug,
            category,
            description,
            tags,
            status,
        });

        return new Response(JSON.stringify(blogDoc), { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return new Response(JSON.stringify({ error: 'Failed to create blog' }), { status: 500 });
    }
}


// GET handler (get blog by ID or list all blogs)
export async function GET(req, res) {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const blog = await Blog.findById(id);
            if (blog) {
                return new Response(JSON.stringify(blog), { status: 200 });
            }
            return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
        } else {
            const blogs = await Blog.find().sort({ createdAt: -1 });
            return new Response(JSON.stringify(blogs), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
    }
}

// PUT handler (update a blog by ID)
export async function PUT(req, res) {
    await mongooseConnect();

    const { _id, title, slug, category, description, tags, status } = await req.json();

    try {
        await Blog.updateOne({ _id }, {
            title,
            slug,
            category,
            description,
            tags,
            status,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update blog' }), { status: 500 });
    }
}

// DELETE handler (delete a blog by ID)
export async function DELETE(req, res) {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            await Blog.deleteOne({ _id: id });
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'ID not provided' }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete blog' }), { status: 500 });
    }
}
