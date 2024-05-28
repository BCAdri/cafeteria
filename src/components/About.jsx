import aboutImage from "../assets/img/cafp.png";

export const About = () => {

    return (
        <div className="bg-white">
            <div className="p-24 grid grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Sobre Nosotros</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    SimCafs ofrece una plataforma web diseñada específicamente para la gestión integral de cafeterías. Con una comprensión de las demandas y complejidades únicas de esta industria, nuestro equipo se ha dedicado al desarrollo de una solución que no solo aborda las necesidades operativas inmediatas, sino que también anticipa y se adapta a las tendencias emergentes en la industria.
                    <br /><br />
                    Ubicados en el Instituto Lluis Simarro Lacabra, en Xàtiva, nuestro equipo de desarrollo trabaja incansablemente para proporcionar a nuestros clientes las herramientas necesarias para optimizar la gestión de sus cafeterías. Además de ofrecer una plataforma digital robusta, también brindamos soporte y asistencia personalizada para garantizar una experiencia satisfactoria para nuestros usuarios.
                    <br /><br />
                    <strong>Dirección:</strong><br />
                    Instituto Lluis Simarro Lacabra<br />
                    Cí. Dos Molins<br />
                    46800 Xàtiva, Valencia<br />
                    España
                </p>
            </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}