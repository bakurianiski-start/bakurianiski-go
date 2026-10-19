export type LegalLanguage = 'en' | 'ka' | 'ru';
export type LegalPageType = 'terms' | 'privacy';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocument {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  contactLabel: string;
  homeLabel: string;
}

export const legalDocuments: Record<
  LegalLanguage,
  Record<LegalPageType, LegalDocument>
> = {
  en: {
    terms: {
      title: 'Terms of Service',
      intro: 'These terms explain how booking requests submitted through the BakurianiSki website work.',
      updated: 'Last updated: October 20, 2026',
      homeLabel: 'Back to home',
      contactLabel: 'Questions about these terms? Contact us at',
      sections: [
        {
          heading: 'Booking requests',
          paragraphs: [
            'Submitting the booking form sends a lesson request; it does not by itself create a confirmed reservation. A booking is confirmed only after BakurianiSki contacts you and confirms the instructor, date, time, and lesson details.',
            'Please provide accurate contact details and booking information so we can respond to your request.',
          ],
        },
        {
          heading: 'Availability and prices',
          paragraphs: [
            'Instructor availability and prices shown on the website are requests and estimates until we confirm them with you. The final lesson details and price will be agreed with you before the booking is confirmed.',
            'The website does not take payment. Any payment method, amount, and applicable terms will be explained and agreed separately before you are asked to pay.',
          ],
        },
        {
          heading: 'Changes and cancellations',
          paragraphs: [
            'To change or cancel a request, email bakurianiski@gmail.com as soon as possible and include the name and date used for the request.',
            'No cancellation fee or refund policy is set by this website. If a lesson is confirmed, any cancellation, rescheduling, payment, or refund terms will be communicated and agreed with you directly before they apply.',
          ],
        },
        {
          heading: 'Using the website',
          paragraphs: [
            'Use the website lawfully and submit information that you are entitled to share. Do not attempt to disrupt the website, send harmful code, or use the forms for spam or unlawful activity.',
            'Website content is provided for general information. A submitted request does not guarantee instructor availability or a particular lesson outcome.',
          ],
        },
        {
          heading: 'Third-party services',
          paragraphs: [
            'The website uses third-party providers to host the site and deliver form messages. Their services are subject to their own terms and privacy notices.',
          ],
        },
        {
          heading: 'Updates and contact',
          paragraphs: [
            'These terms may be updated as the service changes. The current version and its update date will be published on this page.',
            'For questions about a booking or these terms, contact bakurianiski@gmail.com.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'This policy describes the information BakurianiSki receives when you use the booking and contact forms.',
      updated: 'Last updated: October 20, 2026',
      homeLabel: 'Back to home',
      contactLabel: 'Privacy questions or requests? Contact us at',
      sections: [
        {
          heading: 'Information you provide',
          paragraphs: [
            'When you submit a booking request, we receive your name, email address, phone number, selected instructor, lesson type, requested date and time, and any optional notes you provide.',
            'When you use the contact form, we receive your name, email address, subject, and message.',
          ],
        },
        {
          heading: 'How we use your information',
          paragraphs: [
            'We use this information to respond to your enquiry, check and confirm booking details, contact you about a requested lesson, and maintain the operation and security of the service.',
            'Please do not include sensitive personal information in the forms unless it is necessary for your enquiry.',
          ],
        },
        {
          heading: 'Service providers',
          paragraphs: [
            'The website is hosted by Netlify, which may process technical request and security information to provide the website and its server-side functions.',
            'Form messages are sent through Resend to bakurianiski@gmail.com. These providers process information as needed to deliver their services and are subject to their own privacy terms.',
            'BakurianiSki does not sell your personal information. We do not use the information submitted in these forms for unrelated marketing.',
          ],
        },
        {
          heading: 'Storage and retention',
          paragraphs: [
            'Form submissions are delivered to our email inbox. We keep messages only for as long as reasonably needed to respond, manage a booking or enquiry, and meet applicable record-keeping obligations, then delete them when no longer needed.',
          ],
        },
        {
          heading: 'Browser storage and technical data',
          paragraphs: [
            'The website stores your selected language in your browser’s local storage so it can remember your language preference. The hosting provider may process technical logs needed to operate and protect the site.',
          ],
        },
        {
          heading: 'Your choices and contact',
          paragraphs: [
            'You may contact us to request access to, correction of, or deletion of information you sent through the forms. We will handle requests in line with applicable requirements and any records we are required to retain.',
            'To make a privacy request, email bakurianiski@gmail.com. Please do not send passwords or payment card details.',
          ],
        },
        {
          heading: 'Policy updates',
          paragraphs: [
            'We may update this policy when our service or practices change. The current version and its update date will be published on this page.',
          ],
        },
      ],
    },
  },
  ka: {
    terms: {
      title: 'მომსახურების პირობები',
      intro: 'ეს პირობები განმარტავს, როგორ მუშავდება BakurianiSki-ის ვებგვერდზე გამოგზავნილი ჯავშნის მოთხოვნები.',
      updated: 'ბოლო განახლება: 20 ოქტომბერი, 2026',
      homeLabel: 'მთავარ გვერდზე დაბრუნება',
      contactLabel: 'კითხვების შემთხვევაში მოგვწერე:',
      sections: [
        {
          heading: 'ჯავშნის მოთხოვნები',
          paragraphs: [
            'ჯავშნის ფორმის გაგზავნა გაკვეთილის მოთხოვნას გვიგზავნის და თავისთავად დადასტურებულ ჯავშანს არ ნიშნავს. ჯავშანი დადასტურებულია მხოლოდ მას შემდეგ, რაც BakurianiSki დაგიკავშირდება და ინსტრუქტორს, თარიღს, დროსა და გაკვეთილის დეტალებს დაგიდასტურებს.',
            'გთხოვთ, მიუთითოთ სწორი საკონტაქტო და ჯავშნის ინფორმაცია, რათა თქვენს მოთხოვნას ვუპასუხოთ.',
          ],
        },
        {
          heading: 'ხელმისაწვდომობა და ფასები',
          paragraphs: [
            'ვებგვერდზე ნაჩვენები ინსტრუქტორის ხელმისაწვდომობა და ფასები მოთხოვნა და საორიენტაციო ინფორმაციაა, სანამ მათ თქვენთან არ დავადასტურებთ. საბოლოო დეტალებსა და ფასზე ჯავშნის დადასტურებამდე შევთანხმდებით.',
            'ვებგვერდზე გადახდა არ მიიღება. გადახდის მეთოდი, თანხა და შესაბამისი პირობები ცალკე აგიხსნით და შეგითანხმებთ მანამდე, სანამ გადახდას მოგთხოვთ.',
          ],
        },
        {
          heading: 'ცვლილება და გაუქმება',
          paragraphs: [
            'მოთხოვნის შესაცვლელად ან გასაუქმებლად, რაც შეიძლება მალე მოგვწერეთ მისამართზე bakurianiski@gmail.com და მიუთითეთ მოთხოვნაში გამოყენებული სახელი და თარიღი.',
            'ამ ვებგვერდით გაუქმების საფასური ან თანხის დაბრუნების წესი დადგენილი არ არის. დადასტურებული გაკვეთილის შემთხვევაში გაუქმების, დროის შეცვლის, გადახდის ან დაბრუნების პირობებს უშუალოდ შეგატყობინებთ და შეგითანხმებთ მათ ამოქმედებამდე.',
          ],
        },
        {
          heading: 'ვებგვერდის გამოყენება',
          paragraphs: [
            'გამოიყენეთ ვებგვერდი კანონიერად და გააგზავნეთ მხოლოდ ინფორმაცია, რომლის გაზიარების უფლებაც გაქვთ. არ სცადოთ ვებგვერდის შეფერხება, მავნე კოდის გაგზავნა ან ფორმების სპამისა თუ უკანონო საქმიანობისთვის გამოყენება.',
            'ვებგვერდის მასალა ზოგადი ინფორმაციისთვისაა. მოთხოვნის გაგზავნა არ იძლევა ინსტრუქტორის ხელმისაწვდომობის ან გაკვეთილის კონკრეტული შედეგის გარანტიას.',
          ],
        },
        {
          heading: 'მესამე მხარის სერვისები',
          paragraphs: [
            'ვებგვერდი იყენებს მესამე მხარის სერვისებს ჰოსტინგისა და ფორმის შეტყობინებების გასაგზავნად. ამ სერვისებზე მათი პირობები და კონფიდენციალურობის პოლიტიკა ვრცელდება.',
          ],
        },
        {
          heading: 'პირობების განახლება და კონტაქტი',
          paragraphs: [
            'მომსახურების ცვლილების შემთხვევაში ეს პირობები შეიძლება განახლდეს. მოქმედი ვერსია და განახლების თარიღი ამ გვერდზე გამოქვეყნდება.',
            'ჯავშანთან ან პირობებთან დაკავშირებულ კითხვებზე მოგვწერეთ: bakurianiski@gmail.com.',
          ],
        },
      ],
    },
    privacy: {
      title: 'კონფიდენციალურობის პოლიტიკა',
      intro: 'ეს პოლიტიკა აღწერს, რა ინფორმაციას იღებს BakurianiSki ჯავშნისა და საკონტაქტო ფორმების გამოყენებისას.',
      updated: 'ბოლო განახლება: 20 ოქტომბერი, 2026',
      homeLabel: 'მთავარ გვერდზე დაბრუნება',
      contactLabel: 'კონფიდენციალურობაზე შეკითხვის ან მოთხოვნისთვის მოგვწერე:',
      sections: [
        {
          heading: 'თქვენ მიერ მოწოდებული ინფორმაცია',
          paragraphs: [
            'ჯავშნის მოთხოვნისას ვიღებთ თქვენს სახელს, ელფოსტის მისამართს, ტელეფონის ნომერს, არჩეულ ინსტრუქტორს, გაკვეთილის ტიპს, სასურველ თარიღსა და დროს და თქვენს მიერ დამატებულ შენიშვნებს.',
            'საკონტაქტო ფორმის გამოყენებისას ვიღებთ თქვენს სახელს, ელფოსტის მისამართს, თემასა და შეტყობინებას.',
          ],
        },
        {
          heading: 'როგორ ვიყენებთ ინფორმაციას',
          paragraphs: [
            'ინფორმაციას ვიყენებთ შეკითხვაზე პასუხის გასაცემად, ჯავშნის დეტალების შესამოწმებლად და დასადასტურებლად, მოთხოვნილ გაკვეთილთან დაკავშირებით დასაკავშირებლად და მომსახურების მუშაობისა და უსაფრთხოების უზრუნველსაყოფად.',
            'გთხოვთ, ფორმებში არ მიუთითოთ სენსიტიური პირადი ინფორმაცია, თუ ეს თქვენი შეკითხვისთვის აუცილებელი არ არის.',
          ],
        },
        {
          heading: 'მომსახურების მომწოდებლები',
          paragraphs: [
            'ვებგვერდს ჰოსტინგს უწევს Netlify. ვებგვერდისა და მისი სერვერული ფუნქციების მუშაობისთვის მას შეიძლება ტექნიკური მოთხოვნისა და უსაფრთხოების ინფორმაცია დაუმუშავოს.',
            'ფორმის შეტყობინებები Resend-ის მეშვეობით იგზავნება მისამართზე bakurianiski@gmail.com. ეს მომწოდებლები ინფორმაციას მხოლოდ თავიანთი სერვისების გასაწევად საჭირო ფარგლებში ამუშავებენ და მათივე კონფიდენციალურობის პირობები ვრცელდება.',
            'BakurianiSki თქვენს პირად ინფორმაციას არ ყიდის და ფორმებში მიღებულ ინფორმაციას დაუკავშირებელი მარკეტინგისთვის არ იყენებს.',
          ],
        },
        {
          heading: 'შენახვა და წაშლა',
          paragraphs: [
            'ფორმის შეტყობინებები ჩვენს ელფოსტის ყუთში იგზავნება. მათ ვინახავთ მხოლოდ იმდენ ხანს, რამდენიც გონივრულად საჭიროა პასუხის გასაცემად, ჯავშნის ან შეკითხვის სამართავად და კანონით მოთხოვნილი ჩანაწერების შესანარჩუნებლად; საჭიროების ამოწურვის შემდეგ ვშლით.',
          ],
        },
        {
          heading: 'ბრაუზერის საცავი და ტექნიკური ინფორმაცია',
          paragraphs: [
            'ვებგვერდი არჩეული ენის დასამახსოვრებლად თქვენს ბრაუზერში local storage-ს იყენებს. ჰოსტინგის მომწოდებელმა შეიძლება საიტის მუშაობისა და დაცვისთვის საჭირო ტექნიკური ჟურნალები დაამუშაოს.',
          ],
        },
        {
          heading: 'თქვენი უფლებები და კონტაქტი',
          paragraphs: [
            'შეგიძლიათ მოგვმართოთ ფორმით გამოგზავნილ ინფორმაციაზე წვდომის, შესწორების ან წაშლის მოთხოვნით. მოთხოვნებს მოქმედი მოთხოვნებისა და შესანარჩუნებელი ჩანაწერების გათვალისწინებით განვიხილავთ.',
            'კონფიდენციალურობის მოთხოვნისთვის მოგვწერეთ: bakurianiski@gmail.com. არ გამოგზავნოთ პაროლები ან საბანკო ბარათის მონაცემები.',
          ],
        },
        {
          heading: 'პოლიტიკის განახლება',
          paragraphs: [
            'მომსახურების ან ჩვენი პრაქტიკის შეცვლისას პოლიტიკა შეიძლება განახლდეს. მოქმედი ვერსია და განახლების თარიღი ამ გვერდზე გამოქვეყნდება.',
          ],
        },
      ],
    },
  },
  ru: {
    terms: {
      title: 'Условия использования',
      intro: 'В этих условиях объясняется, как обрабатываются заявки на бронирование, отправленные через сайт BakurianiSki.',
      updated: 'Последнее обновление: 20 октября 2026 г.',
      homeLabel: 'Вернуться на главную',
      contactLabel: 'Вопросы об условиях? Напишите нам:',
      sections: [
        {
          heading: 'Заявки на бронирование',
          paragraphs: [
            'Отправка формы направляет заявку на урок и сама по себе не означает подтвержденное бронирование. Бронирование считается подтвержденным только после того, как BakurianiSki свяжется с вами и подтвердит инструктора, дату, время и детали урока.',
            'Пожалуйста, указывайте верные контактные данные и сведения о бронировании, чтобы мы могли ответить.',
          ],
        },
        {
          heading: 'Наличие и цены',
          paragraphs: [
            'Доступность инструктора и цены на сайте являются запросом и ориентировочной информацией, пока мы не подтвердим их с вами. Окончательные детали и цена урока согласуются до подтверждения бронирования.',
            'Сайт не принимает оплату. Способ и сумма оплаты, а также применимые условия будут сообщены и согласованы отдельно до того, как вас попросят заплатить.',
          ],
        },
        {
          heading: 'Изменение и отмена',
          paragraphs: [
            'Чтобы изменить или отменить заявку, как можно скорее напишите на bakurianiski@gmail.com и укажите имя и дату, использованные в заявке.',
            'На сайте не установлены сбор за отмену или правила возврата. Если урок подтвержден, условия отмены, переноса, оплаты или возврата будут сообщены и согласованы с вами напрямую до их применения.',
          ],
        },
        {
          heading: 'Использование сайта',
          paragraphs: [
            'Используйте сайт законно и отправляйте только информацию, которой вправе делиться. Не пытайтесь нарушать работу сайта, отправлять вредоносный код или использовать формы для спама либо незаконной деятельности.',
            'Материалы сайта предоставляются для общей информации. Отправка заявки не гарантирует наличие инструктора или конкретный результат урока.',
          ],
        },
        {
          heading: 'Сторонние сервисы',
          paragraphs: [
            'Для размещения сайта и отправки сообщений из форм используются сторонние поставщики. На их сервисы распространяются собственные условия и политики конфиденциальности.',
          ],
        },
        {
          heading: 'Обновления и связь',
          paragraphs: [
            'Условия могут обновляться при изменении сервиса. Актуальная версия и дата обновления будут опубликованы на этой странице.',
            'По вопросам бронирования или условий напишите на bakurianiski@gmail.com.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Политика конфиденциальности',
      intro: 'В этой политике описана информация, которую BakurianiSki получает при использовании форм бронирования и обратной связи.',
      updated: 'Последнее обновление: 20 октября 2026 г.',
      homeLabel: 'Вернуться на главную',
      contactLabel: 'Вопросы или запросы по конфиденциальности? Напишите нам:',
      sections: [
        {
          heading: 'Предоставляемая вами информация',
          paragraphs: [
            'При отправке заявки на бронирование мы получаем ваше имя, адрес электронной почты, номер телефона, выбранного инструктора, тип урока, желаемые дату и время, а также необязательные заметки.',
            'При использовании контактной формы мы получаем ваше имя, адрес электронной почты, тему и сообщение.',
          ],
        },
        {
          heading: 'Как мы используем информацию',
          paragraphs: [
            'Мы используем эти данные, чтобы ответить на ваш запрос, проверить и подтвердить детали бронирования, связаться с вами по поводу урока, а также обеспечивать работу и безопасность сервиса.',
            'Пожалуйста, не указывайте в формах конфиденциальные личные сведения, если они не нужны для вашего запроса.',
          ],
        },
        {
          heading: 'Поставщики услуг',
          paragraphs: [
            'Сайт размещен на Netlify. Для работы сайта и серверных функций поставщик может обрабатывать технические данные запросов и безопасности.',
            'Сообщения из форм отправляются через Resend на адрес bakurianiski@gmail.com. Поставщики обрабатывают данные в объеме, необходимом для предоставления услуг, и применяют собственные условия конфиденциальности.',
            'BakurianiSki не продает ваши персональные данные и не использует информацию из форм для несвязанного маркетинга.',
          ],
        },
        {
          heading: 'Хранение и удаление',
          paragraphs: [
            'Сообщения из форм доставляются в наш почтовый ящик. Мы храним их только столько, сколько разумно необходимо для ответа, управления бронированием или запросом и выполнения применимых требований к учету, после чего удаляем, когда они больше не нужны.',
          ],
        },
        {
          heading: 'Хранилище браузера и технические данные',
          paragraphs: [
            'Сайт сохраняет выбранный язык в локальном хранилище браузера, чтобы запомнить языковые настройки. Поставщик хостинга может обрабатывать технические журналы, необходимые для работы и защиты сайта.',
          ],
        },
        {
          heading: 'Ваши запросы и связь',
          paragraphs: [
            'Вы можете обратиться к нам с просьбой предоставить доступ к информации, отправленной через формы, исправить или удалить ее. Мы рассмотрим запрос с учетом применимых требований и обязательств по хранению записей.',
            'По вопросам конфиденциальности напишите на bakurianiski@gmail.com. Не отправляйте пароли или данные банковских карт.',
          ],
        },
        {
          heading: 'Обновление политики',
          paragraphs: [
            'Мы можем обновлять политику при изменении сервиса или наших практик. Актуальная версия и дата обновления будут опубликованы на этой странице.',
          ],
        },
      ],
    },
  },
};
