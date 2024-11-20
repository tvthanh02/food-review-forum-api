module.exports = {
  POST_STATUS: ['pending', 'approved', 'rejected', 'warn'],
  REPORT_STATUS: ['Pending', 'Resolved', 'Closed'],
  REPORT_TYPE_STATUS: ['active', 'inactive'],
  CATEGORY_STATUS: ['active', 'inactive'],
  SUB_ADMIN_STATUS: ['Active', 'Pending', 'Suspended', 'Rejected'],
  USER_ROLE: ['admin', 'subadmin', 'user'],
  CONFIRM_REGISTER_TEMPLATE_MAIL: `
 <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <div 
 style="text-align: center; margin-bottom: 20px;">
            <img src="https://img.freepik.com/premium-vector/high-five-hand_52422-25.jpg" alt="Roadmunk Logo" style="width: 100px; height: auto;">
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold;">Thank you for using our services!</p>
            <p>We appreciate your business and hope you found our services helpful.</p>
            <p>If you have any questions or feedback, please don't hesitate to contact us.</p>
        </div>
        <div style="text-align: center; color: #999; font-size: 12px;">
            <p>Best regards,</p>
            <p>Angicungduoc Team</p>
        </div>
    </div>
  `,
  PAGE: 1,
  LIMIT: 20,
};
