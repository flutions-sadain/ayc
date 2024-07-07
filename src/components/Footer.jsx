import React from 'react'

const Footer = () => {
    return (
        <div className="mx-5 lg:mx-20 lg:pb-5">
            {/* <div className="line-divider"></div> */}
            <div className="py-5 padding-medium text-color-white">
                <div className="footer-bottom-wrapper">
                    <div className="footer-credit-text">© 2024 Advancing Your Career. All Rights Reserved.<br /></div>
                    <div className="w-layout-grid footer3-legal-list">
                        <a href="#" className="footer-legal-link">Privacy Policy</a>
                        <a href="#" className="footer-legal-link">Terms of Service</a>
                        <a href="#" className="footer-legal-link">Cookies Settings</a>
                        <a href="http://flames.design/designup" className="footer-legal-link legal">DesignUp</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;