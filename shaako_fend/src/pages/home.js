import Background from './assets/img/mali-800.jpg'
import './assets/fonts/simple-line-icons.min.css'

const Home = () => {
    return (
        <main className="page landing-page">
            <section className="clean-block clean-hero"
                     style={{backgroundImage: "url(" + Background + ")", color: 'rgba(9, 255, 162, 0.85)'}}>
                <div className="text">
                    <h1><span style={{color: 'rgb(66, 0, 255)', backgroundColor: 'rgb(248, 247, 247)'}}>সাঁকো</span></h1>
                    <p><br/><strong><span style={{color: 'rgb(7, 55, 99)', backgroundColor: 'rgb(244, 244, 245)'}}>স্বাস্থ্যসেবার সেতুবন্ধন</span></strong><br/><br/>
                    </p>
                    <button className="btn btn-outline-light btn-lg" type="button"
                            style={{margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green'}}>সেবাপ্রাপ্ত রুগী:
                        110567
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                            style={{margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green'}}>মোট
                        স্বাস্থ্যকর্মী: 10789
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                            style={{margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green'}}>মোট সুপারভাইজার:
                        105
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;