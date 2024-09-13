import React from 'react'

const InstaPost = ({url, ...props}) => {
    return (
        <div {...props}>
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                    background: '#FFF',
                    border: '0',
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    // maxWidth: '540px',
                    // minWidth: '326px',
                    padding: '0',
                    width: '99.375%',
                    WebkitCalc: '100% - 2px',
                    calc: '100% - 2px',
                }}
            >
                <div style={{ padding: '16px' }}>
                    <a href={url} style={{ background: '#FFFFFF', lineHeight: '0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank" rel="noopener noreferrer">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '40px', width: '40px', marginRight: '14px' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', marginBottom: '6px', width: '100px' }}></div>
                                <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', height: '14px', width: '60px' }}></div>
                            </div>
                        </div>
                        <div style={{ padding: '19% 0' }}></div>
                        <div style={{ height: '50px', margin: '0 auto 12px', width: '50px' }}>
                            {/* Instagram logo SVG */}
                            <svg width="50px" height="50px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <g fill="#000">
                                        <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41" />
                                        {/* Add remaining SVG paths */}
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div style={{ paddingTop: '8px', color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontWeight: '550', lineHeight: '18px' }}>View this post on Instagram</div>
                    </a>
                    <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: '0', marginTop: '8px', overflow: 'hidden', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <a href={url} style={{ color: '#c9c8cd', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">A post shared by Awadh Kesari (@awadhkesari)</a>
                    </p>
                </div>
            </blockquote>
        </div>
    )
}

export default InstaPost
