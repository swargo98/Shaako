import React from "react";
import { useState, useEffect } from "react";

const BlogPost = () => {
    let [result, setresult] = useState('');

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        console.log('came eefwfewfewf')
        let response = await fetch('http://127.0.0.1:8000/supervisor/getMyContent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(4)
        })
        let d = await response.json()
        console.log(d)
        let now = d
        console.log(now.title + " " + now.content + " " + now.author + " " + now.upload_time)
        setresult(now);
    }
    return (
        <div>
            <br />
            <header className="masthead" style={{ backgroundColor: "lightyellow" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto position-relative">
                            <div className="post-heading">
                                <h1>{result.title}</h1><span className="meta">Posted by&nbsp;
                                    {result.author}&nbsp;on {result.upload_time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto">
                            <br />
                            <div className="content" dangerouslySetInnerHTML={{__html: result.content}}></div>

                            {/* <p>Never in all their history have men been able truly to conceive of the world as one: a
                                single sphere, a globe, having the qualities of a globe, a round earth in which all the
                                directions eventually meet, in which there is no center because every point, or none, is
                                center — an equal earth which all men occupy as equals. The airman's earth, if free men
                                make it, will be truly round: a globe in practice, not in theory.</p>
                            <p>Science cuts two ways, of course; its products can be used for both good and evil. But
                                there's no turning back from science. The early warnings about technological dangers also
                                come from science.</p>
                            <p>What was most significant about the lunar voyage was not that man set foot on the Moon but
                                that they set eye on the earth.</p>
                            <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty,
                                become her protectors rather than her violators. That's how I felt seeing the Earth for
                                the first time. I could not help but love and cherish her.</p>
                            <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands
                                more who will, the experience most certainly changes your perspective. The things that we
                                share in our world are far more valuable than those which divide us.</p>
                            <h2 className="section-heading">Heading</h2>
                            <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and
                                literally, it is a task to occupy the generations. And no matter how much progress one
                                makes, there is always the thrill of just beginning.</p>
                            <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and
                                literally, it is a task to occupy the generations. And no matter how much progress one
                                makes, there is always the thrill of just beginning.</p>
                            <figure>
                                <blockquote className="blockquote">
                                    <p className="mb-0">The dreams of yesterday are the hopes of today and the reality of
                                        tomorrow. Science has not yet mastered prophecy. We predict too much for the next
                                        year and yet far too little for the next ten.</p>
                                </blockquote>
                            </figure>
                            <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of
                                men. It is a historical process which mankind is carrying out in accordance with the
                                natural laws of human development.</p>
                            <h2 className="section-heading">Reaching for the Stars</h2>
                            <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank
                                to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living
                                object looked so fragile, so delicate, that if you touched it with a finger it would
                                crumble and fall apart. Seeing this has to change a man.</p><a href="#"></a><span
                                    className="text-muted caption">To go places and do things that have never been done before – that’s what living is all about.</span>
                            <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year
                                mission: to explore strange new worlds, to seek out new life and new civilizations, to
                                boldly go where no man has gone before.</p>
                            <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a
                                fundamental truth to our nature, Man must explore, and this is exploration at its
                                greatest.</p>
                            <p><span>Placeholder text by&nbsp;</span><a href="http://spaceipsum.com">Space
                                Ipsum</a><span>&nbsp;Photographs by&nbsp;</span><a
                                    href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>.</p> */}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default BlogPost;
