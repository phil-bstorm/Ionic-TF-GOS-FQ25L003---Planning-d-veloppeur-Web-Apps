import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })
export class CompletionService {

    private token = 'removed for security';

    private readonly httpClient = inject(HttpClient);

    getDenomination(base64: string) {
        return this.httpClient.post('https://api.openai.com/v1/chat/completions',{
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: 'L\'utilisateur va t\'envoyer une image, tu devras lui donner la denomination du produit' },
                { 
                    role: 'user', 
                    content: [{
                        type: 'image_url',
                        image_url: { url: 'data:image/jpeg;base64,' + base64 }
                    }]
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "denominationSchema",
                    strict: true,
                    schema: {
                        type: 'object',
                        required: ['denomination'],
                        properties: { denomination: { type: 'string' } },
                        additionalProperties: false
                    }
                }
            }
        }, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        });
    }

    getEan(denomination: string) {
        return this.httpClient.post('https://api.openai.com/v1/chat/completions',{
            model: 'gpt-4o-search-preview',
            messages: [
                { role: 'system', content: 'L\'utilisateur va t\'envoyer une dénomination, tu devras chercher sur internet et lui donner l\'ean du produit' },
                { role: 'user', content: denomination }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "eanSchema",
                    strict: true,
                    schema: {
                        type: 'object',
                        required: ['ean'],
                        properties: { ean: { type: 'string' } },
                        additionalProperties: false
                    }
                }
            }
        }, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        });
    }
}